<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include("../config/db_connect.php");
include("../utils/auth.php");

$headers = getallheaders();
$authHeader = $headers["Authorization"] ?? "";

if (!$authHeader) {
    echo json_encode(["success" => false, "message" => "Missing Authorization header."]);
    exit;
}

$token = str_replace("Bearer ", "", $authHeader);
$userData = verifyToken($token);
if (!$userData) {
    echo json_encode(["success" => false, "message" => "Invalid or expired token."]);
    exit;
}

// Fetch user preferences (preferred language)
$stmt = $conn->prepare("SELECT PreferredLanguage FROM user WHERE UserID = ?");
$stmt->bind_param("i", $userData->user_id);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
$preferredLanguage = $user["PreferredLanguage"] ?? "English";

// Try to find related countries or experiences
$sql = "SELECT c.CountryName, e.ExperienceName, e.Description
        FROM experience e
        JOIN country c ON e.CountryID = c.CountryID
        WHERE c.Traditions LIKE ? OR e.Description LIKE ? 
        LIMIT 5";

$keyword = "%" . strtolower($preferredLanguage) . "%";
$stmt2 = $conn->prepare($sql);
$stmt2->bind_param("ss", $keyword, $keyword);
$stmt2->execute();
$result2 = $stmt2->get_result();

$suggestions = [];

while ($row = $result2->fetch_assoc()) {
    $suggestions[] = [
        "CountryName" => $row["CountryName"],
        "Experience" => $row["ExperienceName"],
        "Description" => $row["Description"]
    ];
}

// If no matches, give random recommendations
if (empty($suggestions)) {
    $fallback = $conn->query("SELECT c.CountryName, e.ExperienceName, e.Description 
                              FROM experience e
                              JOIN country c ON e.CountryID = c.CountryID
                              ORDER BY RAND() LIMIT 3");
    while ($row = $fallback->fetch_assoc()) {
        $suggestions[] = [
            "CountryName" => $row["CountryName"],
            "Experience" => $row["ExperienceName"],
            "Description" => $row["Description"]
        ];
    }
}

echo json_encode([
    "success" => true,
    "count" => count($suggestions),
    "suggestions" => $suggestions
]);

$conn->close();
?>


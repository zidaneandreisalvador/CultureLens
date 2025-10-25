<?php
header("Content-Type: application/json");
include("../config/db_connect.php"); // PostgreSQL PDO connection
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

try {
    // 🎯 Fetch user preference (Preferred Language)
    $stmt = $conn->prepare("SELECT PreferredLanguage FROM \"User\" WHERE UserID = :id");
    $stmt->execute([":id" => $userData->user_id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    $preferredLanguage = $user["PreferredLanguage"] ?? "English";

    // 🗺️ Try to find related countries or experiences
    $sql = "SELECT c.CountryName, e.ExperienceName, e.Description
            FROM Experience e
            JOIN Country c ON e.CountryID = c.CountryID
            WHERE LOWER(c.Traditions) LIKE :keyword OR LOWER(e.Description) LIKE :keyword
            LIMIT 5";

    $keyword = "%" . strtolower($preferredLanguage) . "%";
    $stmt2 = $conn->prepare($sql);
    $stmt2->execute([":keyword" => $keyword]);
    $suggestions = $stmt2->fetchAll(PDO::FETCH_ASSOC);

    // 🌍 If no matches found, provide random fallback
    if (empty($suggestions)) {
        $fallback = $conn->query("
            SELECT c.CountryName, e.ExperienceName, e.Description 
            FROM Experience e
            JOIN Country c ON e.CountryID = c.CountryID
            ORDER BY RANDOM() 
            LIMIT 3
        ");
        $suggestions = $fallback->fetchAll(PDO::FETCH_ASSOC);
    }

    echo json_encode([
        "success" => true,
        "count" => count($suggestions),
        "suggestions" => $suggestions
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}
?>

<?php
header("Content-Type: application/json");
include("../config/db_connect.php");
include("../utils/auth.php");

$headers = getallheaders();
$authHeader = $headers["Authorization"] ?? "";
if (!$authHeader) {
    echo json_encode(["success" => false, "message" => "Missing Authorization header."]);
    exit;
}

// Verify JWT
$token = str_replace("Bearer ", "", $authHeader);
$userData = verifyToken($token);
if (!$userData) {
    echo json_encode(["success" => false, "message" => "Invalid or expired token."]);
    exit;
}

try {
    $stmt = $conn->prepare("SELECT * FROM Country");
    $stmt->execute();

    $countries = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $countries[] = [
            "CountryID" => $row["countryid"],
            "CountryName" => $row["countryname"],
            "Traditions" => $row["traditions"],
            "Festivals" => $row["festivals"],
            "DressCode" => $row["dresscode"],
            "Greetings" => $row["greetings"]
        ];
    }

    echo json_encode([
        "success" => true,
        "count" => count($countries),
        "countries" => $countries
    ]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>

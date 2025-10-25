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

// Retrieve all country profiles
$sql = "SELECT * FROM country"; // Updated table name
$result = $conn->query($sql);

$countries = [];
while ($row = $result->fetch_assoc()) {
    $countries[] = [
        "CountryID" => $row["CountryID"],
        "CountryName" => $row["CountryName"],
        "Traditions" => $row["Traditions"],
        "Festivals" => $row["Festivals"],
        "DressCode" => $row["DressCode"],
        "Greetings" => $row["Greetings"]
    ];
}

echo json_encode([
    "success" => true,
    "count" => count($countries),
    "countries" => $countries
]);

$conn->close();
?>

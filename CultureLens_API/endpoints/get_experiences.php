<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include("../config/db_connect.php");

$countryID = $_GET["country_id"] ?? null;

if ($countryID) {
    $stmt = $conn->prepare("SELECT * FROM experience WHERE CountryID = ?");
    $stmt->bind_param("i", $countryID);
    $stmt->execute();
    $result = $stmt->get_result();
} else {
    $result = $conn->query("SELECT * FROM experience");
}

$experiences = [];

while ($row = $result->fetch_assoc()) {
    $experiences[] = [
        "ExperienceID" => $row["ExperienceID"],
        "CountryID" => $row["CountryID"],
        "ExperienceName" => $row["ExperienceName"],
        "Description" => $row["Description"]
    ];
}

echo json_encode([
    "success" => true,
    "count" => count($experiences),
    "experiences" => $experiences
]);

$conn->close();
?>


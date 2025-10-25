<?php
header("Content-Type: application/json");
include("../config/db_connect.php");

$countryID = $_GET["country_id"] ?? null;

if ($countryID) {
    $stmt = $conn->prepare("SELECT * FROM Experience WHERE CountryID = ?");
    $stmt->bind_param("i", $countryID);
    $stmt->execute();
    $result = $stmt->get_result();
} else {
    $result = $conn->query("SELECT * FROM Experience");
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

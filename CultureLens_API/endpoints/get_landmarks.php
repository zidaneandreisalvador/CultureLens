<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include("../config/db_connect.php");

$countryID = $_GET["country_id"] ?? null;

if ($countryID) {
    $stmt = $conn->prepare("SELECT * FROM landmark WHERE CountryID = ?");
    $stmt->bind_param("i", $countryID);
    $stmt->execute();
    $result = $stmt->get_result();
} else {
    $result = $conn->query("SELECT * FROM landmark");
}

$landmarks = [];

while ($row = $result->fetch_assoc()) {
    $landmarks[] = [
        "LandmarkID" => $row["LandmarkID"],
        "CountryID" => $row["CountryID"],
        "LandmarkName" => $row["LandmarkName"],
        "Description" => $row["Description"],
        "CulturalEtiquette" => $row["CulturalEtiquette"]
    ];
}

echo json_encode([
    "success" => true,
    "count" => count($landmarks),
    "landmarks" => $landmarks
]);

$conn->close();
?>


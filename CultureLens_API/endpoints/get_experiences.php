<?php
header("Content-Type: application/json");
include("../config/db_connect.php");

$countryID = $_GET["country_id"] ?? null;

try {
    if ($countryID) {
        // Use prepared statement with parameter
        $stmt = $conn->prepare("SELECT * FROM experience WHERE countryid = :countryid");
        $stmt->bindParam(":countryid", $countryID, PDO::PARAM_INT);
        $stmt->execute();
    } else {
        $stmt = $conn->prepare("SELECT * FROM experience");
        $stmt->execute();
    }

    $experiences = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $experiences[] = [
            "ExperienceID" => $row["experienceid"],
            "CountryID" => $row["countryid"],
            "ExperienceName" => $row["experiencename"],
            "Description" => $row["description"]
        ];
    }

    echo json_encode([
        "success" => true,
        "count" => count($experiences),
        "experiences" => $experiences
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
?>

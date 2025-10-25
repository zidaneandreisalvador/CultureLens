<?php
header("Content-Type: application/json");
include("../config/db_connect.php");

$countryID = $_GET["country_id"] ?? null;

try {
    if ($countryID) {
        $stmt = $conn->prepare("SELECT * FROM landmark WHERE countryid = :countryid");
        $stmt->bindParam(":countryid", $countryID, PDO::PARAM_INT);
        $stmt->execute();
        $landmarks = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } else {
        $stmt = $conn->query("SELECT * FROM landmark");
        $landmarks = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    echo json_encode([
        "success" => true,
        "count" => count($landmarks),
        "landmarks" => $landmarks
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
?>

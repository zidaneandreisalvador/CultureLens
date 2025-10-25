<?php
header("Content-Type: application/json");
include("../config/db_connect.php");

$targetType = $_GET["target_type"] ?? '';
$targetID = $_GET["target_id"] ?? '';

if (empty($targetType) || empty($targetID)) {
    echo json_encode(["success" => false, "message" => "Target type and ID required."]);
    exit;
}

try {
    $stmt = $conn->prepare("
        SELECT r.rating, r.comment, r.dateposted, u.firstname, u.lastname 
        FROM review r
        JOIN traveler t ON r.travelerid = t.travelerid
        JOIN users u ON t.userid = u.userid
        WHERE r.targettype = :targettype AND r.targetid = :targetid
        ORDER BY r.dateposted DESC
    ");

    $stmt->bindParam(":targettype", $targetType, PDO::PARAM_STR);
    $stmt->bindParam(":targetid", $targetID, PDO::PARAM_INT);
    $stmt->execute();

    $reviews = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $reviews[] = [
            "Author" => $row["firstname"] . " " . $row["lastname"],
            "Rating" => $row["rating"],
            "Comment" => $row["comment"],
            "DatePosted" => $row["dateposted"]
        ];
    }

    echo json_encode([
        "success" => true,
        "count" => count($reviews),
        "reviews" => $reviews
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
?>

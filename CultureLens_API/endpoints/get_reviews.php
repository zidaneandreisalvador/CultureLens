<?php
header("Content-Type: application/json");
include("../config/db_connect.php");

$targetType = $_GET["target_type"] ?? '';
$targetID = $_GET["target_id"] ?? '';

if (empty($targetType) || empty($targetID)) {
    echo json_encode(["success" => false, "message" => "Target type and ID required."]);
    exit;
}

$stmt = $conn->prepare("SELECT r.Rating, r.Comment, r.DatePosted, u.FirstName, u.LastName 
                        FROM Review r
                        JOIN Traveler t ON r.TravelerID = t.TravelerID
                        JOIN User u ON t.UserID = u.UserID
                        WHERE r.TargetType = ? AND r.TargetID = ?
                        ORDER BY r.DatePosted DESC");
$stmt->bind_param("si", $targetType, $targetID);
$stmt->execute();
$result = $stmt->get_result();

$reviews = [];
while ($row = $result->fetch_assoc()) {
    $reviews[] = [
        "Author" => $row["FirstName"] . " " . $row["LastName"],
        "Rating" => $row["Rating"],
        "Comment" => $row["Comment"],
        "DatePosted" => $row["DatePosted"]
    ];
}

echo json_encode([
    "success" => true,
    "count" => count($reviews),
    "reviews" => $reviews
]);

$conn->close();
?>

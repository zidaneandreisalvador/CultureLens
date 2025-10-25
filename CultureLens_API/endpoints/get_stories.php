<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include("../config/db_connect.php");

$sql = "SELECT t.StoryID, t.Title, t.Content, t.DatePosted, 
               u.FirstName, u.LastName 
        FROM travelstory t
        JOIN traveler tr ON t.TravelerID = tr.TravelerID
        JOIN user u ON tr.UserID = u.UserID
        ORDER BY t.DatePosted DESC";

$result = $conn->query($sql);
$stories = [];

while ($row = $result->fetch_assoc()) {
    $stories[] = [
        "StoryID" => $row["StoryID"],
        "Title" => $row["Title"],
        "Content" => $row["Content"],
        "Author" => $row["FirstName"] . " " . $row["LastName"],
        "DatePosted" => $row["DatePosted"]
    ];
}

echo json_encode([
    "success" => true,
    "count" => count($stories),
    "stories" => $stories
]);

$conn->close();
?>


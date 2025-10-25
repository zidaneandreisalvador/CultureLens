<?php
header("Content-Type: application/json");
include("../config/db_connect.php");

try {
    $sql = "
        SELECT t.storyid, t.title, t.content, t.dateposted, 
               u.firstname, u.lastname
        FROM travelstory t
        JOIN traveler tr ON t.travelerid = tr.travelerid
        JOIN users u ON tr.userid = u.userid
        ORDER BY t.dateposted DESC
    ";

    $stmt = $conn->query($sql);
    $stories = [];

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $stories[] = [
            "StoryID" => $row["storyid"],
            "Title" => $row["title"],
            "Content" => $row["content"],
            "Author" => $row["firstname"] . " " . $row["lastname"],
            "DatePosted" => $row["dateposted"]
        ];
    }

    echo json_encode([
        "success" => true,
        "count" => count($stories),
        "stories" => $stories
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}
?>

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

$token = str_replace("Bearer ", "", $authHeader);
$userData = verifyToken($token);

if (!$userData) {
    echo json_encode(["success" => false, "message" => "Invalid or expired token."]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$title = $data["title"] ?? '';
$content = $data["content"] ?? '';
$image_url = $data["image_url"] ?? null; // optional

if (empty($title) || empty($content)) {
    echo json_encode(["success" => false, "message" => "Title and content are required."]);
    exit;
}

// Insert story into PostgreSQL
$sql = 'INSERT INTO "TravelStory" ("TravelerID", "Title", "Content", "DatePosted") 
        VALUES ($1, $2, $3, NOW()) RETURNING "StoryID"';

$result = pg_query_params($conn, $sql, [
    $userData->user_id,
    $title,
    $content
]);

if ($result && pg_num_rows($result) > 0) {
    $row = pg_fetch_assoc($result);
    echo json_encode([
        "success" => true,
        "message" => "Story posted successfully!",
        "story_id" => $row["StoryID"]
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to post story."]);
}

pg_close($conn);
?>

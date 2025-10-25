<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

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

$stmt = $conn->prepare("INSERT INTO travelstory (TravelerID, Title, Content, DatePosted) VALUES (?, ?, ?, NOW())");
$stmt->bind_param("iss", $userData->user_id, $title, $content);
$success = $stmt->execute();

if ($success) {
    $story_id = $conn->insert_id;
    echo json_encode([
        "success" => true,
        "message" => "Story posted successfully!",
        "story_id" => $story_id
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to post story."]);
}

$conn->close();
?>


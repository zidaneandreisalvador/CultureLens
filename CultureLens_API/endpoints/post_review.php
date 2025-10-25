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
$targetType = $data["target_type"] ?? '';
$targetID = $data["target_id"] ?? null;
$rating = $data["rating"] ?? null;
$comment = $data["comment"] ?? '';

if (empty($targetType) || empty($targetID) || empty($rating)) {
    echo json_encode(["success" => false, "message" => "Target, ID, and rating are required."]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO review (TravelerID, TargetType, TargetID, Rating, Comment, DatePosted) VALUES (?, ?, ?, ?, ?, NOW())");
$stmt->bind_param("isiss", $userData->user_id, $targetType, $targetID, $rating, $comment);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Review submitted successfully!"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to submit review."]);
}

$conn->close();
?>

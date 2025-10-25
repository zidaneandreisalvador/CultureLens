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

// Verify token
$token = str_replace("Bearer ", "", $authHeader);
$userData = verifyToken($token);
if (!$userData) {
    echo json_encode(["success" => false, "message" => "Invalid or expired token."]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$contact = $data["contact_number"] ?? null;
$newPassword = $data["new_password"] ?? null;

$updates = [];
$params = [];
$types = "";

if ($contact) {
    $updates[] = "ContactNumber = ?";
    $params[] = $contact;
    $types .= "s";
}
if ($newPassword) {
    $updates[] = "Password = ?";
    $params[] = password_hash($newPassword, PASSWORD_DEFAULT);
    $types .= "s";
}

if (empty($updates)) {
    echo json_encode(["success" => false, "message" => "No fields to update."]);
    exit;
}

$sql = "UPDATE user SET " . implode(", ", $updates) . " WHERE UserID = ?";
$params[] = $userData->user_id;
$types .= "i";

$stmt = $conn->prepare($sql);
$stmt->bind_param($types, ...$params);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Profile updated successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to update profile."]);
}

$conn->close();
?>

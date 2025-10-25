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
$contact = $data["contact_number"] ?? null;
$language = $data["preferred_language"] ?? null;
$newPassword = $data["new_password"] ?? null;

$updates = [];
$params = [];
$index = 1; // for PostgreSQL $1, $2, etc.

if ($contact) {
    $updates[] = "ContactNumber = $" . $index++;
    $params[] = $contact;
}
if ($language) {
    $updates[] = "PreferredLanguage = $" . $index++;
    $params[] = $language;
}
if ($newPassword) {
    $updates[] = "Password = $" . $index++;
    $params[] = password_hash($newPassword, PASSWORD_DEFAULT);
}

if (empty($updates)) {
    echo json_encode(["success" => false, "message" => "No fields to update."]);
    exit;
}

// Add WHERE clause
$sql = "UPDATE \"User\" SET " . implode(", ", $updates) . " WHERE UserID = $" . $index;
$params[] = $userData->user_id;

$result = pg_query_params($conn, $sql, $params);

if ($result) {
    echo json_encode(["success" => true, "message" => "Profile updated successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to update profile."]);
}

pg_close($conn);
?>

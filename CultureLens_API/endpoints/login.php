<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include("../config/db_connect.php"); // your DB connection

// Read JSON input
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit;
}

$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if (!$email || !$password) {
    echo json_encode(['success' => false, 'message' => 'Email and password are required']);
    exit;
}

// Check if user exists
$stmt = $conn->prepare("SELECT id, first_name, last_name, password, contact_number, preferred_language, user_type FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(['success' => false, 'message' => 'Email not found']);
    exit;
}

$user = $result->fetch_assoc();

// Verify password
if (!password_verify($password, $user['password'])) {
    echo json_encode(['success' => false, 'message' => 'Incorrect password']);
    exit;
}

// Remove password before sending back
unset($user['password']);

// Optional: Generate token (JWT or simple random string) if needed
$token = bin2hex(random_bytes(16)); // temporary token

echo json_encode([
    'success' => true,
    'message' => 'Login successful',
    'token' => $token,
    'user' => $user
]);

$stmt->close();
$conn->close();

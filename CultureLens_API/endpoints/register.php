<?php
header("Content-Type: application/json");
include("../config/db_connect.php");

// Read JSON data
$data = json_decode(file_get_contents("php://input"), true);

$email = $data["email"] ?? '';
$password = $data["password"] ?? '';
$firstName = $data["first_name"] ?? '';
$lastName = $data["last_name"] ?? '';
$contactNumber = $data["contact_number"] ?? '';
$userType = $data["user_type"] ?? 'Traveler'; // Default: Traveler

// Validate input
if (empty($email) || empty($password) || empty($firstName) || empty($lastName)) {
    echo json_encode(["success" => false, "message" => "All required fields must be filled."]);
    exit;
}

// Check if user already exists
$check_sql = 'SELECT * FROM "User" WHERE "Email" = $1';
$check_result = pg_query_params($conn, $check_sql, [$email]);

if (pg_num_rows($check_result) > 0) {
    echo json_encode(["success" => false, "message" => "Email already registered."]);
    exit;
}

// Hash password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Insert new user
$insert_sql = 'INSERT INTO "User" ("Email", "Password", "FirstName", "LastName", "ContactNumber", "UserType") 
               VALUES ($1, $2, $3, $4, $5, $6) RETURNING "UserID"';

$insert_result = pg_query_params($conn, $insert_sql, [
    $email,
    $hashedPassword,
    $firstName,
    $lastName,
    $contactNumber,
    $userType
]);

if ($insert_result && pg_num_rows($insert_result) > 0) {
    $row = pg_fetch_assoc($insert_result);
    $userId = $row["UserID"];

    // Add related record depending on user type
    if ($userType === 'Traveler') {
        pg_query_params($conn, 'INSERT INTO "Traveler" ("UserID") VALUES ($1)', [$userId]);
    } else {
        pg_query_params(
            $conn,
            'INSERT INTO "Admin" ("UserID", "IDNumber", "StartingDate") VALUES ($1, $2, CURRENT_DATE)',
            [$userId, '']
        );
    }

    echo json_encode(["success" => true, "message" => "Registration successful!"]);
} else {
    echo json_encode(["success" => false, "message" => "Registration failed."]);
}

pg_close($conn);
?>

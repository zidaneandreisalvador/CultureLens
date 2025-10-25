<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include("../config/db_connect.php");

// Read JSON data from Android/Postman
$data = json_decode(file_get_contents("php://input"), true);

$email = $data["email"] ?? '';
$password = $data["password"] ?? '';
$firstName = $data["first_name"] ?? '';
$lastName = $data["last_name"] ?? '';
$contactNumber = $data["contact_number"] ?? '';
$preferredLanguage = $data["preferred_language"] ?? '';
$userType = $data["user_type"] ?? 'Traveler'; // Default is Traveler

// Validate input
if (empty($email) || empty($password) || empty($firstName) || empty($lastName)) {
    echo json_encode(["success" => false, "message" => "All required fields must be filled."]);
    exit;
}

// Check if user already exists
$check = $conn->prepare("SELECT * FROM User WHERE Email = ?");
$check->bind_param("s", $email);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Email already registered."]);
    exit;
}

// Hash the password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Insert into User table
$stmt = $conn->prepare("INSERT INTO User (Email, Password, FirstName, LastName, ContactNumber, PreferredLanguage, UserType) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssss", $email, $hashedPassword, $firstName, $lastName, $contactNumber, $preferredLanguage, $userType);

if ($stmt->execute()) {
    $userId = $conn->insert_id;

    if ($userType === 'Traveler') {
        $conn->query("INSERT INTO Traveler (UserID) VALUES ($userId)");
    } else {
        $conn->query("INSERT INTO Admin (UserID, IDNumber, StartingDate) VALUES ($userId, '', CURDATE())");
    }

    echo json_encode(["success" => true, "message" => "Registration successful!"]);
} else {
    echo json_encode(["success" => false, "message" => "Registration failed."]);
}

$conn->close();
?>


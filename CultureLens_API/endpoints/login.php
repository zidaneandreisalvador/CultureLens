<?php
header("Content-Type: application/json");
include("../config/db_connect.php");
include("../utils/auth.php");

$data = json_decode(file_get_contents("php://input"), true);
$email = $data["email"] ?? '';
$password = $data["password"] ?? '';

if (empty($email) || empty($password)) {
    echo json_encode(["success" => false, "message" => "Email and password are required."]);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM User WHERE Email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user["Password"])) {
        $token = createToken(
            $user["UserID"],
            $user["UserType"],
            $user["FirstName"],
            $user["LastName"]
        );

        echo json_encode([
            "success" => true,
            "message" => "Login successful.",
            "token" => $token,
            "user" => [
                "UserID" => $user["UserID"],
                "FirstName" => $user["FirstName"],
                "LastName" => $user["LastName"],
                "UserType" => $user["UserType"]
            ]
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid password."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "User not found."]);
}

$conn->close();
?>

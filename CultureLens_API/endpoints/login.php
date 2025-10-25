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

try {
    // Use lowercase table/column names to match PostgreSQL naming conventions
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = :email");
    $stmt->bindParam(":email", $email, PDO::PARAM_STR);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        if (password_verify($password, $user["password"])) {
            $token = createToken(
                $user["userid"],
                $user["usertype"],
                $user["firstname"],
                $user["lastname"]
            );

            echo json_encode([
                "success" => true,
                "message" => "Login successful.",
                "token" => $token,
                "user" => [
                    "UserID" => $user["userid"],
                    "FirstName" => $user["firstname"],
                    "LastName" => $user["lastname"],
                    "UserType" => $user["usertype"]
                ]
            ]);
        } else {
            echo json_encode(["success" => false, "message" => "Invalid password."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "User not found."]);
    }
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}
?>

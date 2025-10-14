<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once '../vendor/autoload.php'; // loads the JWT library

$secret_key = "CultureLensSecretKey"; // Change this to a long, random string

function createToken($userID, $userType, $firstName, $lastName) {
    global $secret_key;

    $issuedAt = time();
    $expirationTime = $issuedAt + (60 * 60 * 24); // valid for 24 hours

    $payload = [
        "iat" => $issuedAt,
        "exp" => $expirationTime,
        "data" => [
            "user_id" => $userID,
            "user_type" => $userType,
            "first_name" => $firstName,
            "last_name" => $lastName
        ]
    ];

    return JWT::encode($payload, $secret_key, 'HS256');
}

function verifyToken($token) {
    global $secret_key;
    try {
        $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));
        return $decoded->data;
    } catch (Exception $e) {
        return null;
    }
}
?>

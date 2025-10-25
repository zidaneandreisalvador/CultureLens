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

$method = $_SERVER["REQUEST_METHOD"];

if ($method === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $prompt = $data["prompt"] ?? '';
    $destination = $data["destination"] ?? '';
    $travelDates = $data["travel_dates"] ?? '';
    $budget = $data["budget"] ?? 0;
    $interests = $

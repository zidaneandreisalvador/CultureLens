<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

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

$inputText = $data["input_text"] ?? '';
$outputText = $data["output_text"] ?? '';
$sourceLanguage = $data["source_language"] ?? '';
$targetLanguage = $data["target_language"] ?? '';

if (empty($inputText) || empty($outputText)) {
    echo json_encode(["success" => false, "message" => "Input and output text are required."]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO translationlog (TravelerID, InputText, OutputText, SourceLanguage, TargetLanguage, DateTime)
                        VALUES (?, ?, ?, ?, ?, NOW())");
$stmt->bind_param("issss", $userData->user_id, $inputText, $outputText, $sourceLanguage, $targetLanguage);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Translation saved successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to save translation."]);
}

$conn->close();
?>


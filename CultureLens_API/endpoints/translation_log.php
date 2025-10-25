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

$inputText = $data["input_text"] ?? '';
$outputText = $data["output_text"] ?? '';
$sourceLanguage = $data["source_language"] ?? '';
$targetLanguage = $data["target_language"] ?? '';

if (empty($inputText) || empty($outputText)) {
    echo json_encode(["success" => false, "message" => "Input and output text are required."]);
    exit;
}

$sql = 'INSERT INTO "TranslationLog" ("TravelerID", "InputText", "OutputText", "SourceLanguage", "TargetLanguage", "DateTime")
        VALUES ($1, $2, $3, $4, $5, NOW())';
$result = pg_query_params($conn, $sql, [
    $userData->user_id,
    $inputText,
    $outputText,
    $sourceLanguage,
    $targetLanguage
]);

if ($result) {
    echo json_encode(["success" => true, "message" => "Translation saved successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to save translation."]);
}

pg_close($conn);
?>

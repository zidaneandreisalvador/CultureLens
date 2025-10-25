<?php
header("Content-Type: application/json");
include("../config/db_connect.php");
include("../utils/auth.php");

// Validate Authorization header
$headers = getallheaders();
$authHeader = $headers["Authorization"] ?? "";
if (!$authHeader) {
    echo json_encode(["success" => false, "message" => "Missing Authorization header"]);
    exit;
}

$token = str_replace("Bearer ", "", $authHeader);
$userData = verifyToken($token);
if (!$userData) {
    echo json_encode(["success" => false, "message" => "Invalid token"]);
    exit;
}

// Get user question
$data = json_decode(file_get_contents("php://input"), true);
$question = trim($data["question"] ?? "");
if ($question === "") {
    echo json_encode(["success" => false, "message" => "Question required"]);
    exit;
}

// Get API key from environment
$apiKey = getenv("OPENAI_API_KEY");
if (!$apiKey) {
    echo json_encode(["success" => false, "message" => "Missing OpenAI API key"]);
    exit;
}

// Prepare OpenAI request
$payload = json_encode([
    "model" => "gpt-4o-mini",
    "messages" => [
        ["role" => "system", "content" => "You are a friendly cultural travel assistant. Give short, clear answers."],
        ["role" => "user", "content" => $question]
    ]
]);

$ch = curl_init("https://api.openai.com/v1/chat/completions");
curl_setopt_array($ch, [
    CURLOPT_HTTPHEADER => [
        "Content-Type: application/json",
        "Authorization: Bearer $apiKey"
    ],
    CURLOPT_POST => 1,
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_RETURNTRANSFER => true
]);
$result = curl_exec($ch);
curl_close($ch);

$ai = json_decode($result, true);
if (isset($ai["error"])) {
    $answer = "Error: " . $ai["error"]["message"];
} elseif (isset($ai["choices"][0]["message"]["content"])) {
    $answer = $ai["choices"][0]["message"]["content"];
} else {
    $answer = "Sorry, I couldn't find an answer.";
}

echo json_encode(["success" => true, "reply" => $answer]);
?>

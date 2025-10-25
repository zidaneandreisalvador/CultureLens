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
    $interests = $data["interests"] ?? '';

    if (empty($prompt) && (empty($destination) || empty($travelDates))) {
        echo json_encode(["success" => false, "message" => "Prompt or destination/dates are required."]);
        exit;
    }

    // 🔒 Insert your own OpenAI API key here
    $apiKey = "";

    // If a prompt is provided, generate itinerary using AI
    $generatedItinerary = null;
    if (!empty($prompt)) {
        $payload = json_encode([
            "model" => "gpt-4o-mini",
            "messages" => [
                ["role" => "system", "content" => "You are a helpful travel planner AI that creates personalized travel itineraries."],
                ["role" => "user", "content" => $prompt]
            ]
        ]);

        $ch = curl_init("https://api.openai.com/v1/chat/completions");
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Content-Type: application/json",
            "Authorization" => "Bearer " . $apiKey
        ]);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec($ch);
        curl_close($ch);

        $aiResponse = json_decode($result, true);
        $generatedItinerary = $aiResponse["choices"][0]["message"]["content"] ?? "No itinerary generated.";
    }

    // Store itinerary (AI-generated or user-provided) with updated table name
    $stmt = $conn->prepare("INSERT INTO itinerary (TravelerID, Destination, TravelDates, Budget, Interests)
                            VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("issds", $userData->user_id, $destination, $travelDates, $budget, $interests);
    $stmt->execute();
    $itineraryID = $stmt->insert_id;

    echo json_encode([
        "success" => true,
        "message" => "Itinerary saved successfully.",
        "itinerary_id" => $itineraryID,
        "ai_generated_plan" => $generatedItinerary
    ]);
} elseif ($method === "GET") {
    $stmt = $conn->prepare("SELECT * FROM itinerary WHERE TravelerID = ?");
    $stmt->bind_param("i", $userData->user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $plans = [];
    while ($row = $result->fetch_assoc()) {
        $plans[] = $row;
    }

    echo json_encode([
        "success" => true,
        "count" => count($plans),
        "itineraries" => $plans
    ]);
}

$conn->close();
?>

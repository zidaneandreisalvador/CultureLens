<?php
header("Content-Type: application/json");
include("../config/db_connect.php"); // Must now use PDO (PostgreSQL)
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

    // 🔒 Use environment variable for OpenAI key
    $apiKey = getenv("OPENAI_API_KEY");
    if (!$apiKey) {
        echo json_encode(["success" => false, "message" => "Missing OpenAI API key."]);
        exit;
    }

    // 🧠 If prompt is provided, generate AI itinerary
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

        $aiResponse = json_decode($result, true);
        $generatedItinerary = $aiResponse["choices"][0]["message"]["content"] ?? "No itinerary generated.";
    }

    // 🗂️ Store itinerary (PostgreSQL version)
    try {
        $stmt = $conn->prepare("
            INSERT INTO Itinerary (TravelerID, Destination, TravelDates, Budget, Interests)
            VALUES (:traveler, :dest, :dates, :budget, :interests)
            RETURNING ItineraryID
        ");
        $stmt->execute([
            ":traveler" => $userData->user_id,
            ":dest" => $destination,
            ":dates" => $travelDates,
            ":budget" => $budget,
            ":interests" => $interests
        ]);
        $itineraryID = $stmt->fetchColumn();

        echo json_encode([
            "success" => true,
            "message" => "Itinerary saved successfully.",
            "itinerary_id" => $itineraryID,
            "ai_generated_plan" => $generatedItinerary
        ]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
    }
}

elseif ($method === "GET") {
    try {
        $stmt = $conn->prepare("SELECT * FROM Itinerary WHERE TravelerID = :traveler");
        $stmt->execute([":traveler" => $userData->user_id]);
        $plans = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            "success" => true,
            "count" => count($plans),
            "itineraries" => $plans
        ]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Database fetch error: " . $e->getMessage()]);
    }
}
?>



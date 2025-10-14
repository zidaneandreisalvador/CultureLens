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
    // Save a trip
    $data = json_decode(file_get_contents("php://input"), true);
    $itineraryID = $data["itinerary_id"] ?? null;

    if (!$itineraryID) {
        echo json_encode(["success" => false, "message" => "Missing itinerary ID."]);
        exit;
    }

    // Check if already saved
    $check = $conn->prepare("SELECT * FROM SavedTrips WHERE TravelerID = ? AND ItineraryID = ?");
    $check->bind_param("ii", $userData->user_id, $itineraryID);
    $check->execute();
    $res = $check->get_result();

    if ($res->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "Trip already saved."]);
        exit;
    }

    // Save new favorite trip
    $stmt = $conn->prepare("INSERT INTO SavedTrips (TravelerID, ItineraryID, SavedAt) VALUES (?, ?, NOW())");
    $stmt->bind_param("ii", $userData->user_id, $itineraryID);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Trip saved successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to save trip."]);
    }
}
elseif ($method === "GET") {
    // Retrieve saved trips
    $stmt = $conn->prepare("
        SELECT s.SavedTripID, i.Destination, i.TravelDates, i.Budget, i.Interests, s.SavedAt
        FROM SavedTrips s
        JOIN Itinerary i ON s.ItineraryID = i.ItineraryID
        WHERE s.TravelerID = ?
        ORDER BY s.SavedAt DESC
    ");
    $stmt->bind_param("i", $userData->user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $trips = [];
    while ($row = $result->fetch_assoc()) {
        $trips[] = $row;
    }

    echo json_encode([
        "success" => true,
        "count" => count($trips),
        "saved_trips" => $trips
    ]);
}

$conn->close();
?>

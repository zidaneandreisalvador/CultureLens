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
    $check_sql = 'SELECT * FROM "SavedTrips" WHERE "TravelerID" = $1 AND "ItineraryID" = $2';
    $check_result = pg_query_params($conn, $check_sql, [$userData->user_id, $itineraryID]);

    if (pg_num_rows($check_result) > 0) {
        echo json_encode(["success" => false, "message" => "Trip already saved."]);
        exit;
    }

    // Save new favorite trip
    $insert_sql = 'INSERT INTO "SavedTrips" ("TravelerID", "ItineraryID", "SavedAt") VALUES ($1, $2, NOW())';
    $insert_result = pg_query_params($conn, $insert_sql, [$userData->user_id, $itineraryID]);

    if ($insert_result) {
        echo json_encode(["success" => true, "message" => "Trip saved successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to save trip."]);
    }
}

elseif ($method === "GET") {
    // Retrieve saved trips
    $query = '
        SELECT s."SavedTripID", i."Destination", i."TravelDates", i."Budget", i."Interests", s."SavedAt"
        FROM "SavedTrips" s
        JOIN "Itinerary" i ON s."ItineraryID" = i."ItineraryID"
        WHERE s."TravelerID" = $1
        ORDER BY s."SavedAt" DESC
    ';
    $result = pg_query_params($conn, $query, [$userData->user_id]);

    $trips = [];
    while ($row = pg_fetch_assoc($result)) {
        $trips[] = $row;
    }

    echo json_encode([
        "success" => true,
        "count" => count($trips),
        "saved_trips" => $trips
    ]);
}

pg_close($conn);
?>

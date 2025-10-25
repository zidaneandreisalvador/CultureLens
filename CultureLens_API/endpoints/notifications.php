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

// Get notifications for traveler
$sql = "SELECT * FROM \"Notification\" WHERE \"TravelerID\" = $1 ORDER BY \"DateTime\" DESC";
$result = pg_query_params($conn, $sql, [$userData->user_id]);

if (!$result) {
    echo json_encode(["success" => false, "message" => "Database query failed."]);
    exit;
}

$notifications = [];
while ($row = pg_fetch_assoc($result)) {
    $notifications[] = [
        "NotificationID" => $row["NotificationID"],
        "Message" => $row["Message"],
        "Location" => $row["Location"],
        "DateTime" => $row["DateTime"]
    ];
}

echo json_encode([
    "success" => true,
    "count" => count($notifications),
    "notifications" => $notifications
]);

pg_close($conn);
?>

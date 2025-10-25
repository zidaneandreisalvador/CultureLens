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
$sql = "SELECT * FROM notification WHERE TravelerID = ? ORDER BY DateTime DESC";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userData->user_id);
$stmt->execute();
$result = $stmt->get_result();

$notifications = [];
while ($row = $result->fetch_assoc()) {
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

$conn->close();
?>

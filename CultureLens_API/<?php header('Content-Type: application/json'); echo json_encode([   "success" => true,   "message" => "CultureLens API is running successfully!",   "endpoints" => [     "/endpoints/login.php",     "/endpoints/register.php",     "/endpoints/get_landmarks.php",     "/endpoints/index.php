<?php
header('Content-Type: application/json');
echo json_encode([
  "success" => true,
  "message" => "CultureLens API is running successfully!",
  "endpoints" => [
    "/endpoints/login.php",
    "/endpoints/register.php",
    "/endpoints/get_landmarks.php",
    "/endpoints/ai_planner.php"
  ]
]);

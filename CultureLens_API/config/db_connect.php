<?php
// config/db_connect.php

$host = "dpg-d3u8g875r7bs73fb4tmg-a";      // Database host
$user = "culturelens_db_user";           // Default XAMPP user
$pass = "DX1CSLlKlqOQJ4fzyGuIPywCyeQu1ZHm";               // Default password (empty)
$dbname = "culturelens_db"; // The database you created

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Check connection
if ($conn->connect_error) {
    die(json_encode([
        "success" => false,
        "message" => "Database connection failed: " . $conn->connect_error
    ]));
}
?>

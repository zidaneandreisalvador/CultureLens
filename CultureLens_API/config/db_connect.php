<?php
// config/db_connect.php

$host = "dpg-d3u8g875r7bs73fb4tmg-a";       // Render PostgreSQL host
$port = "5432";                             // Default PostgreSQL port
$dbname = "culturelens_db";                 // Your Render DB name
$user = "culturelens_db_user";              // Your Render DB username
$password = "DX1CSLlKlqOQJ4fzyGuIPywCyeQu1ZHm"; // Your Render DB password

// Create connection using pg_connect()
$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

// Check connection
if (!$conn) {
    die(json_encode([
        "success" => false,
        "message" => "PostgreSQL connection failed: " . pg_last_error()
    ]));
}
?>

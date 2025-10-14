<?php
// config/db_connect.php

$host = "localhost";      // Database host
$user = "root";           // Default XAMPP user
$pass = "";               // Default password (empty)
$dbname = "culturelens_db"; // The database you created

// Create connection
$conn = new mysqli($host, $user, $pass, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode([
        "success" => false,
        "message" => "Database connection failed: " . $conn->connect_error
    ]));
}
?>

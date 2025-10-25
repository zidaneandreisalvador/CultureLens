<?php
// config/db_connect.php

$host = "dpg-d3u8g875r7bs73fb4tmg-a";      // Database host
$user = "culturelens_db_user";           // Default XAMPP user
$pass = "DX1CSLlKlqOQJ4fzyGuIPywCyeQu1ZHm";               // Default password (empty)
$dbname = "culturelens_db"; // The database you created

$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

if (!$conn) {
    die("Connection failed: " . pg_last_error());
}
?>


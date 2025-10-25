<?php
$servername = "mainline.proxy.rlwy.net";
$username   = "root";
$password   = "PQGrmTSwYIweYnxtUjwAtNbuCthfnqvj";
$database   = "railway";
$port       = 25859;

$conn = new mysqli($servername, $username, $password, $database, $port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "✅ Connected successfully to Railway MySQL!";
}
?>

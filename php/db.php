<?php
require 'vendor/autoload.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// PER DOCKER $dbhost = "db";
$dbhost = "localhost";
$dbport = "3306";
$dbuser = "root";
// PER DOCKER $dbpass = "password";
$dbpass = "";
$dbname = "react-php";

$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname, $dbport);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

<?php
require 'vendor/autoload.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// PER DOCKER $dbhost = "db", PER LOCAL DEV $dbhost = "localhost";
$dbhost = "db";
$dbport = "3306";
$dbuser = "root";
// PER DOCKER $dbpass = "password", PER LOCAL DEV $dbpass = "";
$dbpass = "password";
$dbname = "react-php";

$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname, $dbport);

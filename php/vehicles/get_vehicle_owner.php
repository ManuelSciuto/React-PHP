<?php
global $conn;
include '../db.php';

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);
$client_id = $data['client_id'] ?? 0;

if ($client_id > 0) {
    $query = "SELECT d.name, d.surname FROM data d WHERE d.id = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "i", $client_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $userData = $result->fetch_assoc();
    if ($userData) {
        $fullName = $userData['name'] . ' ' . $userData['surname'];
        echo $fullName;
    } else {
        echo "Errore: utente non trovato";
    }
}

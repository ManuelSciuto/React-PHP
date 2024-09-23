<?php
global $conn;
include 'db.php';

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);
$id = $data['id'] ?? 0;

if ($id > 0) {
    $query = "SELECT city, name, address, email FROM providers WHERE id_provider = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $userData = $result->fetch_assoc();
    if ($userData) {
        echo json_encode($userData);
    } else {
        echo json_encode(array('error' => "Dati del fornitore non trovati"));
    }
}

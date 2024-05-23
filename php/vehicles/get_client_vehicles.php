<?php
global $conn;
include '../db.php';

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);
$id = $data['id'] ?? 0;

if ($id > 0) {
    $query = "SELECT * FROM vehicles v JOIN vehicle_data vd ON v.vehicle_id = vd.vehicle_id WHERE v.client_id = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $rows = array();
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    echo json_encode($rows);
} else {
    echo json_encode(array('error' => 'Utente non trovato'));
}
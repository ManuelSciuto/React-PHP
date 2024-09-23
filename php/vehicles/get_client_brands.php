<?php
global $conn;
include '../db.php';

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);
$id = $data['id'] ?? 0;

if ($id > 0) {
    $query = "SELECT vd.brand FROM vehicle_data vd JOIN vehicles v ON vd.vehicle_id = v.vehicle_id WHERE v.client_id = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $brands = array();
    while ($row = $result->fetch_assoc()) {
        $brands[] = $row['brand'];
    }
    echo !empty($brands) ? json_encode(array('brands' => implode(",", $brands))) : "";
    $stmt->close();
} else {
    echo json_encode(array('error' => 'Utente non trovato'));
}

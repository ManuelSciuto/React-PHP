<?php
global $conn;
include '../db.php';

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);
$mech_id = $data['mech_id'] ?? 0;

if ($mech_id > 0) {
    $query = "SELECT * FROM vehicles v JOIN vehicle_data vd ON v.vehicle_id = vd.vehicle_id WHERE vd.vehicle_id IN (SELECT j.vehicle_id from jobs j WHERE j.mech_id = ?)";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "i", $mech_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $rows = array();
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    echo json_encode(array("vehicles" => $rows));
} else {
    echo json_encode(array('error' => 'Utente non trovato'));
}

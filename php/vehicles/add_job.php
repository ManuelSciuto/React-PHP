<?php
global $conn;
include '../db.php';

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);
$mech_id = $data['mech_id'] ?? 0;
$vehicle_id = $data['vehicle_id'] ?? 0;

if ($mech_id > 0 && $vehicle_id > 0) {
    $query = "INSERT INTO jobs (vehicle_id, mech_id) VALUES (?, ?)";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "ii", $vehicle_id, $mech_id);
    $stmt->execute();
    $result = $stmt->affected_rows;
    if ($result <= 0) {
        echo "Impossibile aggiungere il veicolo";
        return;
    }
    echo "Veicolo aggiunto con successo";
} else {
    echo "Errore, impossibile aggiungere il veicolo";
}
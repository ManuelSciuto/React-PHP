<?php
global $conn;
include '../db.php';

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);
$mech_id = $data['mech_id'] ?? 0;
$vehicle_id = $data['vehicle_id'] ?? 0;

if ($mech_id > 0 && $vehicle_id > 0) {
    $query = "DELETE FROM jobs WHERE vehicle_id = ? AND mech_id = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "ii", $vehicle_id, $mech_id);
    $stmt->execute();
    $result = $stmt->affected_rows;
    if ($result <= 0) {
        echo "Impossibile eliminare il veicolo";
        return;
    }
    echo "Veicolo eliminato con successo";
} else {
    echo "Errore, impossibile eliminare il veicolo";
}
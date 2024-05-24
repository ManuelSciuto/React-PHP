<?php
global $conn;
include '../db.php';

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);
$vehicle_id = $data['vehicle_id'] ?? 0;

if ($vehicle_id > 0) {
    mysqli_begin_transaction($conn);
    try {
        $query = "DELETE FROM vehicles WHERE vehicle_id = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "i", $vehicle_id);
        $stmt->execute();
        $result = $stmt->affected_rows;
        if ($result <= 0) {
            echo "Impossibile eliminare il veicolo";
            throw new Exception("Impossibile eliminare il veicolo");
        }
        $query = "DELETE FROM vehicle_data WHERE vehicle_id = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "i", $vehicle_id);
        $stmt->execute();
        $result = $stmt->affected_rows;
        if ($result <= 0) {
            echo "Impossibile eliminare il veicolo";
            throw new Exception("Impossibile eliminare il veicolo");
        }
        mysqli_commit($conn);
        echo "Veicolo eliminato con successo";
    } catch (Exception $e) {
        mysqli_rollback($conn);
    }
} else {
    echo "Errore, veicolo non trovato";
}
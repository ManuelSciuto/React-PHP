<?php
global $conn;
include '../db.php';

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);
$vehicle_id = $data['vehicle_id'] ?? 0;
$brand = $data['brand'] ?? "";
$model = $data['model'] ?? "";
$tag = $data['tag'] ?? "";
$reg_date = $data['reg_date'] ?? "";

if ($vehicle_id > 0) {
    $query = "UPDATE vehicle_data SET brand = ?, model = ?, tag = ?, reg_date = ? WHERE vehicle_id = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "ssssi", $brand, $model, $tag, $reg_date, $vehicle_id);
    $stmt->execute();
    $result = $stmt->affected_rows;
    if ($result <= 0) {
        echo "Impossibile aggiornare il veicolo";
        return;
    }
    echo "Veicolo aggiornato con successo";
} else {
    echo "Veicolo non trovato";
}

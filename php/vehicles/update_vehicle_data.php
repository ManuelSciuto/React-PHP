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
$status = $data['status'] ?? null;
$arrival_date = $data['arrival_date'] ?? null;

if ($vehicle_id > 0) {
    $res = 0;
    if (!empty($status) || !empty($arrival_date)) {
        $query = "UPDATE vehicles SET status = ?, arrival_date = ? WHERE vehicle_id = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "ssi", $status, $arrival_date, $vehicle_id);
        $stmt->execute();
        $res += $stmt->affected_rows;
    }

    if (!empty($brand) || !empty($model) || !empty($tag) || !empty($reg_date)) {
        $query = "UPDATE vehicle_data SET brand = ?, model = ?, tag = ?, reg_date = ? WHERE vehicle_id = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "ssssi", $brand, $model, $tag, $reg_date, $vehicle_id);
        $stmt->execute();
        $res += $stmt->affected_rows;
    }
    if ($res <= 0) {
        echo "Impossibile aggiornare i dati del veicolo";
        return;
    }
    echo "Veicolo aggiornato con successo";
} else {
    echo "Veicolo non trovato";
}

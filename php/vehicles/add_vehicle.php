<?php
global $conn;
include '../db.php';

$arrival_date = $_POST['arrival_date'] ?? null;
$status = $_POST['status'] ?? null;
$client_id = $_POST['client_id'] ?? 0;
$model = $_POST['model'] ?? "";
$tag = $_POST['tag'] ?? null;
$brand = $_POST['brand'] ?? "";
$reg_date = $_POST['reg_date'] ?? "";

if ($client_id > 0 && !empty($model) && !empty($brand) && !empty($reg_date)) {
    mysqli_begin_transaction($conn);
    try {
        $query = "INSERT INTO vehicles (arrival_date, status, client_id) VALUES (?, ?, ?)";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "ssi", $arrival_date, $status, $client_id);
        $stmt->execute();
        $result = $stmt->affected_rows;
        if ($result <= 0) {
            echo "Impossibile aggiungere il veicolo";
            throw new Exception("Impossibile aggiungere il veicolo");
        }
        $query = "INSERT INTO vehicle_data (model, tag, brand, reg_date) VALUES (?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "ssss", $model, $tag, $brand, $reg_date);
        $stmt->execute();
        $result = $stmt->affected_rows;
        if ($result <= 0) {
            echo "Impossibile aggiungere il veicolo";
            throw new Exception("Impossibile aggiungere il veicolo");
        }
        echo "Veicolo aggiunto con successo";
        mysqli_commit($conn);
    } catch (Exception $e) {
        mysqli_rollback($conn);
    }
} else {
    echo "Errore, impossibile aggiungere il veicolo";
}

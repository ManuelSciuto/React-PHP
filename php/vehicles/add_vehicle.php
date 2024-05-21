<?php
include '../db.php';

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);
$arrival_date = isset($data['arrival_date']) ? $data['arrival_date'] : null;
$status = isset($data['status']) ? $data['status'] : null;
$client_id = isset($data['client_id']) ? $data['client_id'] : 0;
$model = isset($data['model']) ? $data['model'] : "";
$tag = isset($data['tag']) ? $data['tag'] : "";
$brand = isset($data['brand']) ? $data['brand'] : "";
$reg_date = isset($data['reg_date']) ? $data['reg_date'] : null;


if ($client_id > 0 && !empty($model) && !empty($tag) && !empty($brand) && !empty($reg_date))
{
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
?>
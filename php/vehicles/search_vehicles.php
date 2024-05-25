<?php
global $conn;
include '../db.php';

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);
$brand = $data['brand'] ?? "";
$model = $data['model'] ?? "";

$query = "SELECT * FROM vehicles v JOIN vehicle_data vd ON v.vehicle_id = vd.vehicle_id WHERE vd.brand LIKE ? AND vd.model LIKE ? AND vd.vehicle_id NOT IN (SELECT vehicle_id FROM jobs)";
$stmt = mysqli_prepare($conn, $query);
$brandLike = $brand . '%';
$modelLike = $model . '%';
mysqli_stmt_bind_param($stmt, "ss", $brandLike, $modelLike);
$stmt->execute();
$result = $stmt->get_result();
$rows = array();
while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}
echo json_encode($rows);
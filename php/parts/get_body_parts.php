<?php
global $conn;
include '../db.php';

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);

$page = $data['page'];
$brands = $data['brands'] ?? null;
$brandCount = count($brands);
$elementiPerPagina = 50;
$offset = ($page - 1) * $elementiPerPagina;

if ($brandCount > 0) {
    $query = "SELECT * FROM body_parts WHERE ";
    for ($i = 0; $i < $brandCount; $i++) {
        $escapedBrand = mysqli_real_escape_string($conn, $brands[$i]);
        $query .= "vehicle_model LIKE '%$escapedBrand%'";
        // Metto l'OR solo se non è l'ultimo brand
        if ($i < $brandCount - 1) {
            $query .= " OR ";
        }
    }

    $query .= " LIMIT $elementiPerPagina OFFSET $offset";
    $stmt = mysqli_prepare($conn, $query);
    $stmt->execute();
    $result = $stmt->get_result();
    $rows = array();
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    echo json_encode($rows);
} else {
    echo json_encode([]);
}

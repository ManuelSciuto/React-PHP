<?php
include '../db.php';

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);
$id = isset($data['id']) ? $data['id'] : 0;

if ($id > 0) {
    $query = "SELECT COUNT(*) as count FROM employees WHERE employee_id = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    if ($row['count'] > 0) {
        echo "true";
    } else {
        echo "false";
    }
} else {
    echo 'Utente non trovato';
}
?>
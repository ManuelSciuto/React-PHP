<?php
include '../db.php';

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);
$id = isset($data['id']) ? $data['id'] : 0;

if ($id > 0) {
    $query = "SELECT u.username, c.company_name, c.vat_number, d.name, d.surname, d.address, d.phone_num
                         FROM users u
                         LEFT JOIN clients c ON u.id = c.client_id
                         LEFT JOIN data d ON u.id = d.id
                         LEFT JOIN employees e ON u.id = e.employee_id
                         WHERE u.id = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $userData = $result->fetch_assoc();
    echo $userData;
    if ($userData['company_name'] === null && $userData['vat_number'] === null) {
        unset($userData['company_name']);
        unset($userData['vat_number']);
    } else if ($userData['tax_code'] === null) {
        unset($userData['tax_code']);
    }
    echo json_encode($userData);
}
?>
<?php
include '../db.php';

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);
$id = isset($data['id']) ? $data['id'] : 0;

if ($id > 0) {
    /* Provo a prendere il cliente prima */
    $query = "SELECT u.username, c.company_name, c.vat_number, c.client_since, d.name, d.surname, d.address, d.phone_num
                         FROM users u
                         LEFT JOIN clients c ON u.id = c.client_id
                         LEFT JOIN data d ON u.id = d.id
                         WHERE c.client_id = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $userData = $result->fetch_assoc();
    if ($userData) {
        $userData["isEmployee"] = false;
        echo json_encode($userData);
        return;
    }

    /* Provo a prendere il dipendente se non trovo clienti */
        $query = "SELECT u.username, e.monthly_salary, e.tax_code, e.position, e.hiring_date, d.name, d.surname, d.address, d.phone_num
                             FROM users u
                             LEFT JOIN employees e ON u.id = e.employee_id
                             LEFT JOIN data d ON u.id = d.id
                             WHERE e.employee_id = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $userData = $result->fetch_assoc();
        if ($userData) {
            $userData["isEmployee"] = true;
            echo json_encode($userData);
            return;
        }
    echo "Errore utente non trovato";
}
?>
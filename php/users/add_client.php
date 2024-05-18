<?php
include '../db.php';

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);
$username = isset($data['username']) ? $data['username'] : "";
$password = isset($data['password']) ? password_hash($data['password'], PASSWORD_BCRYPT) : "";
$name = isset($data['name']) ? $data['name'] : "";
$surname = isset($data['surname']) ? $data['surname'] : "";
$address = isset($data['address']) ? $data['address'] : "";
$phone_num = isset($data['phone_num']) ? $data['phone_num'] : "";
$vat_number = isset($data['vat_number']) ? $data['vat_number'] : "";
$company_name = isset($data['company_name']) ? $data['company_name'] : null;

if (!empty($username) && !empty($password) && !empty($name) && !empty($surname) && !empty($address) && !empty($phone_num) && !empty($vat_number))
{
    $query = "INSERT INTO users (username, password) VALUES (?, ?)";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "ss", $username, $password);
        $stmt->execute();
        $result = $stmt->get_result();
        $client_id = mysqli_insert_id($conn);
        if (!$client_id) {
            echo "Impossibile inserire l'utente";
            return;
        }
        $query = "INSERT INTO data (name, surname, address, phone_num) VALUES (?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "ssss", $name, $surname, $address, $phone_num);
        $stmt->execute();
        $result = $stmt->affected_rows;
        if ($result <= 0) {
            $query = "DELETE FROM users WHERE id = ?";
            $stmt = mysqli_prepare($conn, $query);
            mysqli_stmt_bind_param($stmt, "i", $client_id);
            $stmt->execute();
            echo "Impossibile inserire l'utente";
            return;
        }
        $query = "INSERT INTO clients (client_id, vat_number, company_name) VALUES (?, ?, ?)";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "iss", $client_id, $vat_number, $company_name);
        $stmt->execute();
        $result = $stmt->affected_rows;
        if ($result <= 0) {
            $query = "DELETE FROM users WHERE id = ?";
            $stmt = mysqli_prepare($conn, $query);
            mysqli_stmt_bind_param($stmt, "i", $client_id);
            $stmt->execute();
            $query = "DELETE FROM data WHERE id = ?";
            $stmt = mysqli_prepare($conn, $query);
            mysqli_stmt_bind_param($stmt, "i", $client_id);
            $stmt->execute();
            echo "Impossibile inserire l'utente";
            return;
        }
        echo "Utente inserito con successo";
} else {
    echo "Campo obbligatorio mancantw";
}
?>
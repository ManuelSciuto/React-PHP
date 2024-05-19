<?php
include '../db.php';

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);
$id = isset($data['id']) ? $data['id'] : 0;
$name = isset($data['name']) ? $data['name'] : "";
$surname = isset($data['surname']) ? $data['surname'] : "";
$address = isset($data['address']) ? $data['address'] : "";
$phone_num = isset($data['phone_num']) ? $data['phone_num'] : "";

if (empty($name) || empty($surname) || empty($address) || empty($phone_num)) {
    echo "Valori inseriti non validi";
    return;
}

if ($id > 0) {
        $query = "UPDATE data SET name = ?, surname = ?, address = ?, phone_num = ? WHERE id = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "ssssi", $name, $surname, $address, $phone_num, $id);
        $stmt->execute();
        $result = $stmt->affected_rows;
        if ($result <= 0) {
            echo "Impossibile aggiornare l'utente";
            return;
        }
        echo "Utente aggiornato con successo";
} else {
    echo "Utente non trovato";
}
?>
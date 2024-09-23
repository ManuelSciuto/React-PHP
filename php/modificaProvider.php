<?php
global $conn;
include 'db.php';

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);
$id_provider = $data['id_provider'] ?? 0;
$email = $data['email'] ?? "";
$address = $data['address'] ?? "";

if (empty($address) || empty($email) || $id_provider == 0) {
    echo "Valori inseriti non validi";
    return;
}

if ($id_provider > 0) {
    $query = "UPDATE providers SET address = ?, email = ? WHERE id_provider = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "ssi", $address, $email, $id_provider);
    $stmt->execute();
    $result = $stmt->affected_rows;
    if ($result <= 0) {
        echo "Impossibile aggiornare l'account";
        return;
    }
    echo "Account aggiornato con successo";
} else {
    echo "Account non trovato";
}

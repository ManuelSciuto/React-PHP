<?php
global $conn;
include 'db.php';

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);
$id_provider = $data['id_provider'] ?? 0;

if ($id_provider > 0) {
    $query = "DELETE FROM providers WHERE id_provider = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "i", $id_provider);
    $stmt->execute();
    $result = $stmt->affected_rows;
    if ($result <= 0) {
        echo "Impossibile eliminare l'account";
        throw new Exception("Impossibile eliminare l'account");
    }
    echo "Account eliminato con successo";
} else {
    echo "Errore, account non trovato";
}

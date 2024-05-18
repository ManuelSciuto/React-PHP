<?php
include '../db.php';

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);
$id = isset($data['id']) ? $data['id'] : 0;

if ($id > 0)
{
    mysqli_begin_transaction($conn);
    try {
        $query = "DELETE FROM users WHERE id = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "i", $client_id);
        $stmt->execute;
        $result = $stmt->affected_rows;
        if ($result <= 0) {
            echo "Impossibile eliminare l'utente";
            throw new Exception("Impossibile eliminare l'utente");
        }
        $query = "DELETE FROM data WHERE id = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "i", $client_id);
        $stmt->execute();
        $result = $stmt->affected_rows;
        if ($result <= 0) {
            echo "Impossibile eliminare l'utente";
            throw new Exception("Impossibile eliminare l'utente");
        }
        mysqli_commit($conn);
        echo "Utente eliminato con successo";
    } catch (Exception $e) {
        mysqli_rollback($conn);
    }
} else {
    echo "Errore, utente non trovato";
}
?>
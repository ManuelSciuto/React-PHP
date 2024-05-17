<?php
include '../db.php';

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);
$id = isset($data['id']) ? $data['id'] : 0;
$username = isset($data['username']) ? $data['username'] : "";
$password = isset($data['password']) ? password_hash($data['password']) : "";

if ($id > 0 && !empty($username) && !empty($password)) {
    $query = "UPDATE users SET username = ?, password = ? WHERE id = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "ssi", $username, $password, $id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result > 0) {
        return "Utente Aggiornato";
    } else {
        return "Impossibile aggiornare l'utente";
    }
}
?>
<?php
global $conn;
include '../db.php';

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);
$id = $data['id'] ?? 0;
$password = $data['password'] ?? "";
$new_password = $data['new_password'] ?? "";

if (empty($password)) {
    echo "Password inserita non valida";
    return;
} else if (empty($new_password)) {
    echo "Nuova password non valida";
    return;
}

if ($id > 0) {
    $query = "SELECT password FROM users WHERE id = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    if (!empty($row)) {
        if (password_verify($password, $row['password'])) {
            $query = "UPDATE users SET password = ? WHERE id = ?";
            $stmt = mysqli_prepare($conn, $query);
            $hashed_pass = password_hash($new_password, PASSWORD_BCRYPT);
            mysqli_stmt_bind_param($stmt, "si", $hashed_pass, $id);
            $stmt->execute();
            $result = $stmt->affected_rows;
            if ($result <= 0) {
                echo "Impossibile aggiornare la password";
                return;
            }
            echo "Password aggiornata con successo";
        } else {
            echo 'Password Errata';
        }
    } else {
        echo "Utente non trovato";
    }
} else {
    echo "Utente non trovato";
}
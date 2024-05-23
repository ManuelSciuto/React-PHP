<?php
global $conn;
include 'db.php';
require_once 'vendor/autoload.php';
use Firebase\JWT\JWT;

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);
$username = $data['username'] ?? '';
$password = $data['password'] ?? '';
$rememberMe = $data["rememberMe"] ?? false;
$response = array();

if (!empty($username) && !empty($password)) {
    $query = "SELECT id, password FROM users WHERE username = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    $row = $result->fetch_assoc();
    if (!empty($row)) {
        if (password_verify($password, $row['password'])) {
            $tokenData = [
                'id' => $row['id'],
                'username' => $username,
                'exp' => time() + ($rememberMe ? 604800 : 3600), // Una settimana o Un'ora
            ];

            $jwtKey = 'ae5734d02c8c3b82e282b08c64a1efad9a0d6d723dd4df6c2c6c723b8fcbe4a6';
            $alg = 'HS256';
            $token = JWT::encode($tokenData, $jwtKey, $alg);
            $response['token'] =  $token;
        } else {
            $response['error'] =  'Password Errata';
        }
    } else {
        $response['error'] = "Username errato";
    }

} else if (!empty($username)) {
    $response['error'] = 'Username not provided';
} else {
    $response['error'] = 'Password not provided';
}

echo json_encode($response);


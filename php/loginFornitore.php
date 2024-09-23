<?php
global $conn;
include 'db.php';
require_once 'vendor/autoload.php';

use Firebase\JWT\JWT;

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);
$key = $data['key'] ?? '';
$email = $data['email'] ?? '';

if (!empty($key)) {
    $query = "SELECT id_provider, name, access_key, pendingRequest FROM providers WHERE email = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    if (!empty($row)) {
        if ($key == $row['access_key']) {
            if ($row['pendingRequest'] == true) {
                $response['error'] = 'La vostra richesta non è stata ancora accettata';
            } else {
                $tokenData = [
                    'id_provider' => $row['id_provider'],
                    'name' => $row['name'],
                    'exp' => time() + 604800, // Una settimana
                ];

                $jwtKey = 'ae5734d02c8c3b82e282b08c64a1efad9a0d6d723dd4df6c2c6c723b8fcbe4a6';
                $alg = 'HS256';
                $token = JWT::encode($tokenData, $jwtKey, $alg);
                $response['token'] =  $token;
            }
        } else {
            $response['error'] =  'Access Key errata';
        }
    } else {
        $response['error'] = "Fornitore non trovato";
    }
} else if (!empty($mail)) {
    $response['error'] = 'Email non fornita';
} else {
    $response['error'] = 'Access key non fornita';
}

echo json_encode($response);

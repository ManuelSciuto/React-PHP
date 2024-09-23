<?php
require_once 'vendor/autoload.php';
include 'db.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);
$encryptedToken = $data["token"] ?? null;
if ($encryptedToken === null) {
    echo false;
    return;
}

$jwtKey = 'ae5734d02c8c3b82e282b08c64a1efad9a0d6d723dd4df6c2c6c723b8fcbe4a6';
$alg = 'HS256';

try {
    $decoded = JWT::decode($encryptedToken, new Key($jwtKey, $alg));
    $payload = (array) $decoded;
    if (!isset($payload['exp'])) {
        echo false;
        return;
    }
    if (time() < $payload['exp']) {
        echo json_encode(array('id_provider' => $payload["id_provider"], 'name' => $payload["name"]));
        return;
    }
} catch (\Exception $e) {
    error_log('Token verification failed: ' . $e->getMessage());
    echo false;
}

<?php
global $conn;
include 'db.php';

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);
$email = $data['email'] ?? "";
$city = $data['city'] ?? "";
$address = $data['address'] ?? "";
$company_name = $data['company_name'] ?? "";

if (!empty($email) && !empty($city) && !empty($address) && !empty($company_name)) {

    // Funzione per generare una nuova chiave casuale lunga 16 
    function generaNuovaKey($lunghezza = 16)
    {
        return substr(str_shuffle(str_repeat('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', $lunghezza)), 0, $lunghezza);
    }

    $query = "SELECT access_key FROM providers";
    $result = mysqli_query($conn, $query);
    $keys = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $keys[] = $row['access_key'];
    }
    $key = generaNuovaKey();
    while (in_array($key, $keys)) {
        $key = generaNuovaKey();
    }

    $query = "INSERT INTO providers (city, name, address, email, access_key, pendingRequest) VALUES (?, ?, ?, ?, ?, true)";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "sssss", $city, $company_name, $address, $email, $key);
    $stmt->execute();
    $result = $stmt->affected_rows;
    if ($result <= 0) {
        echo json_encode(array('error' => "Si è verificato un errore, riprovare"));
        return;
    }
    echo json_encode(array('key' => $key));
} else {
    echo json_encode(array('error' => "Si è verificato un errore, riprovare"));
}

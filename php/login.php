<?php
include 'db.php';

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);
$username = isset($data['username']) ? $data['username'] : '';
$password = isset($data['password']) ? $data['password'] : '';
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
            $response['id'] =  $row['id'];
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
?>

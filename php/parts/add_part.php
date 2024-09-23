<?php
global $conn;
include '../db.php';

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);

$is_body_part = $data['is_body_part'] ?? null;
$length = $data['length'] ?? 0;
$height = $data['height'] ?? 0;
$thickness = $data['thickness'] ?? 0;
$weight = $data['weight'] ?? 0;
$price = $data['price'] ?? 0;
$ship_time = $data['ship_time'] ?? 0;
$availability = $data['availability'] ?? 0;

if ($is_body_part === null) {
    echo "Errore";
    return;
}

mysqli_begin_transaction($conn);

try {
    $query = "INSERT INTO parts_detail (length, height, thickness, weight) VALUES (?, ?, ?, ?)";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "iiii", $length, $height, $thickness, $weight);
    $stmt->execute();
    $part_id = mysqli_insert_id($conn);

    if (!$part_id) {
        throw new Exception("Impossibile inserire il prodotto");
    }

    $query = "INSERT INTO storage (part_id, price, ship_time, availability) VALUES (?, ?, ?, ?)";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "iiii", $part_id, $price, $ship_time, $availability);
    $stmt->execute();

    if (mysqli_stmt_affected_rows($stmt) <= 0) {
        throw new Exception("Impossibile inserire il prodotto");
    }

    if ($is_body_part) {
        $bd_name = $data['bd_name'] ?? "";
        $bd_description = $data['bd_description'] ?? "";
        $bid_provider = $data['bid_provider'] ?? 0;
        $year = $data['year'] ?? 0;
        $color = $data['color'] ?? "";
        $vehicle_model = $data['vehicle_model'] ?? "";

        $query = "INSERT INTO body_parts (bd_id, bd_name, bd_description, bid_provider, year, color, vehicle_model) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "issiiss", $part_id, $bd_name, $bd_description, $bid_provider, $year, $color, $vehicle_model);
        $stmt->execute();

        if (mysqli_stmt_affected_rows($stmt) <= 0) {
            throw new Exception("Impossibile inserire il prodotto");
        }
    } else {
        $mp_name = $data['mp_name'] ?? "";
        $mp_description = $data['mp_description'] ?? "";
        $mid_provider = $data['mid_provider'] ?? 0;
        $year_from = $data['year_from'] ?? 0;
        $year_to = $data['year_to'] ?? 0;
        $builds_on = $data['builds_on'] ?? "";

        $query = "INSERT INTO mechanical_parts (mp_id, mp_name, mp_description, mid_provider, year_from, year_to, builds_on) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "issiiis", $part_id, $mp_name, $mp_description, $mid_provider, $year_from, $year_to, $builds_on);
        $stmt->execute();

        if (mysqli_stmt_affected_rows($stmt) <= 0) {
            throw new Exception("Impossibile inserire il prodotto");
        }
    }

    mysqli_commit($conn);
    echo "Prodotto inserito con successo";
} catch (Exception $e) {
    mysqli_rollback($conn);
    echo $e->getMessage();
}

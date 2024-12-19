<?php
// Include database connection
include('db_connection.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get data from POST request
    $item_name = $_POST['item_name'];
    $item_type = $_POST['item_type'];
    $item_size = $_POST['item_size'];
    $item_quantity = $_POST['item_quantity'];
    $item_price = $_POST['item_price'];

    // Validate input
    if (empty($item_name) || empty($item_type) || empty($item_size) || empty($item_quantity) || empty($item_price)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required.']);
        exit;
    }

    // Sanitize data to prevent SQL injection
    $item_name = mysqli_real_escape_string($conn, $item_name);
    $item_type = mysqli_real_escape_string($conn, $item_type);
    $item_size = mysqli_real_escape_string($conn, $item_size);
    $item_quantity = mysqli_real_escape_string($conn, $item_quantity);
    $item_price = mysqli_real_escape_string($conn, $item_price);

    // Insert into database
    $query = "INSERT INTO inventory (item_name, item_type, item_size, item_quantity, item_price) VALUES ('$item_name', '$item_type', '$item_size', '$item_quantity', '$item_price')";

    if (mysqli_query($conn, $query)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to add item.']);
    }

    // Close database connection
    mysqli_close($conn);
}
?>

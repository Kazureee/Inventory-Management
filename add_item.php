<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "your_database";  // Replace with your actual database name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if POST data is available
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $itemName = $_POST['item_name'] ?? '';
    $itemType = $_POST['item_type'] ?? '';
    $itemSize = $_POST['item_size'] ?? '';
    $itemQuantity = $_POST['item_quantity'] ?? 0;
    $itemPrice = $_POST['item_price'] ?? 0;

    // Debugging - Print received data
    echo "Received data: ";
    var_dump($_POST);

    // Check if all fields are provided
    if (empty($itemName) || empty($itemType) || empty($itemSize) || empty($itemQuantity) || empty($itemPrice)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
        exit;
    }

    // Prepare the SQL query to insert the item into the database
    $sql = "INSERT INTO inventory (item_name, item_type, item_size, item_quantity, item_price)
            VALUES ('$itemName', '$itemType', '$itemSize', '$itemQuantity', '$itemPrice')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true, 'message' => 'Item added successfully']);
    } else {
        // Error inserting the item
        echo json_encode(['success' => false, 'message' => 'Error: ' . $conn->error]);
    }

    // Close the connection
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
}
?>

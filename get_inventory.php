<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "inventory_management";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to retrieve inventory data
$sql = "SELECT * FROM inventory";
$result = $conn->query($sql);

$items = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $items[] = $row;  // Add each item to the items array
    }
    echo json_encode(["success" => true, "items" => $items]);  // Return data as JSON
} else {
    echo json_encode(["success" => false, "message" => "No items found"]);
}

// Close connection
$conn->close();
?>

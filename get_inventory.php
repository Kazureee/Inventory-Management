<?php
// Your database connection code here
header('Content-Type: application/json');

// Example: Query to fetch inventory data from your database
$connection = new mysqli('localhost', 'username', 'password', 'database_name');

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

// Example query to fetch data
$sql = "SELECT * FROM inventory_table"; // Replace with your actual table and columns
$result = $connection->query($sql);

if ($result->num_rows > 0) {
    $inventoryData = [];

    while($row = $result->fetch_assoc()) {
        $inventoryData[] = $row;
    }

    // Send JSON response
    echo json_encode($inventoryData);
} else {
    echo json_encode([]);  // Return an empty array if no data
}

$connection->close();
?>

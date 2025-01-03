<?php
include 'db_connect.php';

// Function to get all inventory items
function getInventoryItems() {
    global $conn;
    $sql = "SELECT * FROM inventory";
    $result = $conn->query($sql);

    $items = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $items[] = $row;
        }
    }
    return $items;
}

// Function to add a new inventory item
function addInventoryItem($item_name, $item_type, $item_size, $item_quantity, $item_price) {
    global $conn;
    $sql = "INSERT INTO inventory (item_name, item_type, item_size, item_quantity, item_price) VALUES ('$item_name', '$item_type', '$item_size', $item_quantity, $item_price)";
    return $conn->query($sql);
}

// Function to delete an inventory item
function deleteInventoryItem($id) {
    global $conn;
    $sql = "DELETE FROM inventory WHERE id=$id";
    return $conn->query($sql);
}

// Function to update an inventory item
function updateInventoryItem($id, $item_name, $item_type, $item_size, $item_quantity, $item_price) {
    global $conn;
    $sql = "UPDATE inventory SET item_name='$item_name', item_type='$item_type', item_size='$item_size', item_quantity=$item_quantity, item_price=$item_price WHERE id=$id";
    return $conn->query($sql);
}
?>
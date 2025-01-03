<?php
include 'inventory_operations.php';

$action = $_POST['action'];

switch ($action) {
    case 'getItems':
        $items = getInventoryItems();
        echo json_encode($items);
        break;
    case 'addItem':
        $item_name = $_POST['item_name'];
        $item_type = $_POST['item_type'];
        $item_size = $_POST['item_size'];
        $item_quantity = $_POST['item_quantity'];
        $item_price = $_POST['item_price'];
        $result = addInventoryItem($item_name, $item_type, $item_size, $item_quantity, $item_price);
        echo json_encode(['success' => $result]);
        break;
    case 'deleteItem':
        $id = $_POST['id'];
        $result = deleteInventoryItem($id);
        echo json_encode(['success' => $result]);
        break;
    case 'updateItem':
        $id = $_POST['id'];
        $item_name = $_POST['item_name'];
        $item_type = $_POST['item_type'];
        $item_size = $_POST['item_size'];
        $item_quantity = $_POST['item_quantity'];
        $item_price = $_POST['item_price'];
        $result = updateInventoryItem($id, $item_name, $item_type, $item_size, $item_quantity, $item_price);
        echo json_encode(['success' => $result]);
        break;
    default:
        echo json_encode(['error' => 'Invalid action']);
        break;
}
?>
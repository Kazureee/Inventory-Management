CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('User', 'Admin') DEFAULT 'User'
);

-- Create table for Inventory Items
CREATE TABLE inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    item_type ENUM('Pants', 'T-Shirt', 'Polo', 'Jacket', 'Polo Shirt', 'Short', 'Skirt', 'Dress') NOT NULL,
    item_size ENUM('XXXS', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL') NOT NULL,
    item_quantity INT DEFAULT 1,
    item_price DECIMAL(10, 2) NOT NULL
);

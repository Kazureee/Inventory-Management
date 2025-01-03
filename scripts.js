document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("login-btn");
    const registerBtn = document.getElementById("register-btn");
    const loginFormContainer = document.getElementById("login-form-container");
    const registrationFormContainer = document.getElementById("registration-form-container");
    const loginForm = document.getElementById("login-form");
    const registrationForm = document.getElementById("registration-form");

    // Toggle Forms
    loginBtn?.addEventListener("click", () => {
        loginBtn.classList.add("active");
        registerBtn.classList.remove("active");
        loginFormContainer.style.display = "block";
        registrationFormContainer.style.display = "none";
    });

    registerBtn?.addEventListener("click", () => {
        registerBtn.classList.add("active");
        loginBtn.classList.remove("active");
        registrationFormContainer.style.display = "block";
        loginFormContainer.style.display = "none";
    });

    // Login Form Submission
    loginForm?.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
    
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(user => user.username === username && user.password === password);
    
        if (user) {
            // Store the logged-in user's information
            localStorage.setItem("loggedInUser", JSON.stringify({
                username: user.username,
                role: user.role
            }));
    
            alert("Login successful!");
            console.log("Login successful, redirecting to Home.html");
            window.location.href = "Home.html"; // Redirect after login
        } else {
            alert("Invalid login credentials!");
        }
    });

    // Registration Form Submission
    registrationForm?.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("reg-name")?.value.trim();
        const username = document.getElementById("reg-username").value.trim();
        const password = document.getElementById("reg-password").value.trim();
        const role = document.getElementById("reg-role").value;

        if (!role) {
            const roleError = document.getElementById("role-error-message");
            if (roleError) roleError.style.display = "block";
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.some(user => user.username === username)) {
            alert("Username already exists. Please choose a different one.");
            return;
        }

        users.push({ name: name || "N/A", username, password, role });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration successful!");
        window.location.href = "login.html";
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const inventoryForm = document.getElementById('inventory-form');
    const tableBody = document.getElementById('inventory-table').getElementsByTagName('tbody')[0];

    // Load inventory from localStorage on page load
    function loadInventory() {
        const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
        inventory.forEach(item => addRowToTable(item));
    }

    // Save inventory to localStorage
    function saveInventoryToLocalStorage() {
        const rows = tableBody.rows;
        const inventory = [];
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            inventory.push({
                itemName: row.cells[0].textContent,
                itemType: row.cells[1].textContent,
                itemSize: row.cells[2].textContent,
                itemQuantity: row.cells[3].textContent,
                itemPrice: row.cells[4].textContent.replace('₱', ''),
                totalAmount: row.cells[5].textContent.replace('₱', '')
            });
        }
        localStorage.setItem('inventory', JSON.stringify(inventory));
    }

    // Add a new row to the table
    function addRowToTable({ itemName, itemType, itemSize, itemQuantity, itemPrice, totalAmount }) {
        const newRow = tableBody.insertRow(tableBody.rows.length);

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);
        const cell6 = newRow.insertCell(5);
        const cell7 = newRow.insertCell(6);

        cell1.textContent = itemName;
        cell2.textContent = itemType;
        cell3.textContent = itemSize;
        cell4.textContent = itemQuantity;
        cell5.textContent = `₱${parseFloat(itemPrice).toFixed(2)}`;
        cell6.textContent = `₱${parseFloat(totalAmount).toFixed(2)}`;

        // Edit button
        const editButton = document.createElement('button');
        editButton.classList.add('action-btn', 'edit-btn');
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.addEventListener('click', function () {
            document.getElementById('item-name').value = itemName;
            document.getElementById('item-type').value = itemType;
            document.getElementById('item-size').value = itemSize;
            document.getElementById('item-quantity').value = itemQuantity;
            document.getElementById('item-price').value = itemPrice;

            // Remove the row and update localStorage
            tableBody.deleteRow(newRow.rowIndex - 1);
            saveInventoryToLocalStorage();
        });

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('action-btn', 'delete-btn');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.addEventListener('click', function () {
            tableBody.deleteRow(newRow.rowIndex - 1);
            saveInventoryToLocalStorage();
        });

        cell7.appendChild(editButton);
        cell7.appendChild(deleteButton);
    }

    // Add item to inventory
    inventoryForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const itemName = document.getElementById('item-name').value;
        const itemType = document.getElementById('item-type').value;
        const itemSize = document.getElementById('item-size').value;
        const itemQuantity = document.getElementById('item-quantity').value;
        const itemPrice = document.getElementById('item-price').value;

        if (itemName && itemType && itemSize && itemQuantity && itemPrice) {
            const totalAmount = parseFloat(itemQuantity) * parseFloat(itemPrice);

            const newItem = {
                itemName,
                itemType,
                itemSize,
                itemQuantity,
                itemPrice,
                totalAmount
            };

            addRowToTable(newItem);

            // Save to localStorage
            saveInventoryToLocalStorage();

            // Reset form
            inventoryForm.reset();
        }
    });

    // Load inventory on page load
    loadInventory();
});

document.addEventListener('DOMContentLoaded', function () {
    // Function to load inventory from localStorage
    function loadInventory() {
        return JSON.parse(localStorage.getItem('inventory')) || [];
    }

    // Function to calculate the total number of items (including duplicates)
    function getTotalItemCount() {
        const inventory = loadInventory();
        return inventory.length; // Return the total number of items in the inventory
    }

    // Function to display the total number of items in the dashboard
    function displayTotalItemCount() {
        const totalItemCount = getTotalItemCount();

        // Display the total item count in the dashboard
        const totalItemCountElement = document.getElementById('total-items');
        totalItemCountElement.textContent = totalItemCount; // Update the text with the total item count
    }

    // Call the display function to show the total item count when the page is loaded
    displayTotalItemCount();
});

document.addEventListener('DOMContentLoaded', function () {
    // Function to load inventory from localStorage
    function loadInventory() {
        return JSON.parse(localStorage.getItem('inventory')) || [];
    }

    // Function to get the names of items with low stock (under 20)
    function getLowStockItems() {
        const inventory = loadInventory();
        // Filter items where the quantity is less than 20
        const lowStockItems = inventory.filter(item => parseInt(item.itemQuantity) < 20);
        return lowStockItems.map(item => item.itemName); // Return an array of item names
    }

    // Function to display the low stock item names in the dashboard
    function displayLowStockItems() {
        const lowStockItems = getLowStockItems();

        // Find the container in which to display low stock items
        const lowStockContainer = document.getElementById('low-stock-items');

        // Clear any existing content in the container
        lowStockContainer.innerHTML = '';

        // Check if there are any low stock items to display
        if (lowStockItems.length > 0) {
            // Create a list of low stock item names
            lowStockItems.forEach(itemName => {
                const listItem = document.createElement('li');
                listItem.textContent = itemName;
                lowStockContainer.appendChild(listItem);
            });
        } else {
            lowStockContainer.textContent = 'No low stock items available.';
        }
    }

    // Call the display function to show the low stock items when the page is loaded
    displayLowStockItems();
});

document.addEventListener('DOMContentLoaded', function () {
    // Function to load inventory from localStorage
    function loadInventory() {
        return JSON.parse(localStorage.getItem('inventory')) || [];
    }

    // Function to calculate the total value of all items in the inventory
    function getTotalValue() {
        const inventory = loadInventory();
        let totalValue = 0;

        // Loop through each item and calculate total value (quantity * price)
        inventory.forEach(item => {
            const totalAmount = parseFloat(item.itemQuantity) * parseFloat(item.itemPrice);
            totalValue += totalAmount;
        });

        return totalValue;
    }

    // Function to display the total value in the dashboard
    function displayTotalValue() {
        const totalValue = getTotalValue();

        // Find the container in which to display the total value
        const totalValueContainer = document.getElementById('total-value');

        // Update the container with the total value formatted as currency
        totalValueContainer.textContent = `₱${totalValue.toFixed(2)}`;
    }

    // Call the display function to show the total value when the page is loaded
    displayTotalValue();
});

window.addEventListener('load', () => {
    const currentPage = window.location.pathname.split("/").pop();
    if (currentPage === "login.html" || currentPage === "registration.html") {
        // Skip login check on the login and registration pages
        return;
    }

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    console.log("Checking login status:", loggedInUser);

    if (!loggedInUser) {
        alert("You need to log in first.");
        window.location.href = "login.html";  // Redirect to login if no user is logged in
        return;
    }

    // Determine the sidebar based on the user's role
    const sidebarPath = loggedInUser.role === 'admin' ? 'sidebar.html' : 'sidebar2.html';
    
    fetch(sidebarPath)
        .then(response => {
            if (!response.ok) throw new Error("Sidebar file not found");
            return response.text();
        })
        .then(data => {
            document.getElementById("sidebar-container").innerHTML = data;

            // Highlight the active menu link
            const sidebarLinks = document.querySelectorAll(".sidebar-menu li a");

            sidebarLinks.forEach(link => {
                const linkHref = link.getAttribute("href").split("/").pop();
                if (linkHref === currentPage) {
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            });
        })
        .catch(err => console.error("Error loading sidebar:", err));
});

// Function to load users from localStorage and display them in the table
function loadUsers() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userTableBody = document.getElementById("user-table").getElementsByTagName("tbody")[0];
    userTableBody.innerHTML = ''; // Clear existing rows

    users.forEach(user => {
        const row = userTableBody.insertRow();
        row.insertCell(0).innerText = user.name || "N/A";
        row.insertCell(1).innerText = user.username;
        row.insertCell(2).innerText = user.role;
        row.insertCell(3).innerHTML = `
            <button class="action-btn edit-btn"><i class="fas fa-edit"></i></button>
            <button class="action-btn delete-btn"><i class="fas fa-trash-alt"></i></button>
        `;
        row.dataset.username = user.username; // Store username in data attribute
    });
}

// Initial load of users
loadUsers();

// Event delegation for Edit and Delete buttons
document.getElementById("user-table").addEventListener('click', (event) => {
    const target = event.target.closest('.action-btn'); // Ensure you handle clicks on buttons and icons
    if (!target) return; // Exit if the clicked element is not a button or inside a button

    if (target.classList.contains('edit-btn')) {
        const row = target.closest('tr');
        const username = row.dataset.username;

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const userToEdit = users.find(user => user.username === username);

        if (userToEdit) {
            document.getElementById("edit-name").value = userToEdit.name;
            document.getElementById("edit-username").value = userToEdit.username;
            document.getElementById("edit-role").value = userToEdit.role;

            document.getElementById("edit-user-modal").style.display = "block";

            document.getElementById("edit-user-form").onsubmit = (e) => {
                e.preventDefault();

                userToEdit.name = document.getElementById("edit-name").value;
                userToEdit.username = document.getElementById("edit-username").value;
                userToEdit.role = document.getElementById("edit-role").value;

                localStorage.setItem("users", JSON.stringify(users));

                loadUsers();

                document.getElementById("edit-user-modal").style.display = "none";
            };
        }
    }

    if (target.classList.contains('delete-btn')) {
        const row = target.closest('tr');
        const username = row.dataset.username;

        if (confirm(`Are you sure you want to delete user: ${username}?`)) {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const updatedUsers = users.filter(user => user.username !== username);
            localStorage.setItem("users", JSON.stringify(updatedUsers));

            row.remove();
        }
    }
});

// Close modal on cancel button
document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("edit-user-modal").style.display = "none";
});
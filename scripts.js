document.addEventListener("DOMContentLoaded", () => {
    // Sidebar fetch and display
    fetch("sidebar.html")
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load sidebar HTML.');
        }
        return response.text();
    })
    .then(data => {
        document.getElementById("sidebar-container").innerHTML = data;

        const currentPage = window.location.pathname.split("/").pop();
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

    // Toggle Buttons (Login/Registration)
    const loginBtn = document.getElementById("login-btn");
    const registerBtn = document.getElementById("register-btn");

    const loginFormContainer = document.getElementById("login-form-container");
    const registrationFormContainer = document.getElementById("registration-form-container");

    loginBtn.addEventListener("click", () => {
        loginBtn.classList.add("active");
        registerBtn.classList.remove("active");
        loginFormContainer.style.display = "block";
        registrationFormContainer.style.display = "none";
    });

    registerBtn.addEventListener("click", () => {
        registerBtn.classList.add("active");
        loginBtn.classList.remove("active");
        registrationFormContainer.style.display = "block";
        loginFormContainer.style.display = "none";
    });

    // Login and Registration Logic
    const loginForm = document.getElementById("login-form");
    const registrationForm = document.getElementById("registration-form");

    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
    
            const adminUsername = "admin";
            const adminPassword = "admin";
    
            if (username === adminUsername && password === adminPassword) {
                alert("Login successful!");
                window.location.href = "Home.html"; // Redirect to the home page
            } else {
                const users = JSON.parse(localStorage.getItem("users")) || [];
                const storedUser = users.find(user => user.username === username && user.password === password);
    
                if (storedUser) {
                    alert("Login successful!");
                    window.location.href = "Home.html";
                } else {
                    alert("Invalid login credentials!");
                }
            }
        });
    }

    if (registrationForm) {
        registrationForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const username = document.getElementById("reg-username").value;
            const password = document.getElementById("reg-password").value;

            const users = JSON.parse(localStorage.getItem("users")) || [];

            const existingUser  = users.find(user => user.username === username);
            if (existingUser) {
                alert("Username already exists. Please choose a different one.");
                return;
            }

            users.push({ username, password, role: "User", lastLogin: null });
            localStorage.setItem("users", JSON.stringify(users));

            alert("Registration Successful!");
            window.location.href = "login.html"; 
        });
    }

    // Add Item to Inventory
    document.getElementById('inventory-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const itemName = document.getElementById('item-name').value;
        const itemType = document.getElementById('item-type').value;
        const itemSize = document.getElementById('item-size').value;
        const itemQuantity = document.getElementById('item-quantity').value;
        const itemPrice = document.getElementById('item-price').value;

        if (!itemName || !itemType || !itemSize || !itemQuantity || !itemPrice) {
            alert("All fields must be filled.");
            return;
        }

        // Ensure itemQuantity and itemPrice are numbers
        if (isNaN(itemQuantity) || isNaN(itemPrice)) {
            alert("Quantity and price must be valid numbers.");
            return;
        }

        const tableBody = document.getElementById('inventory-table').getElementsByTagName('tbody')[0];

        const newRow = tableBody.insertRow(tableBody.rows.length);

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2); 
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);
        const cell6 = newRow.insertCell(5);
        const cell7 = newRow.insertCell(6);

        const totalAmount = parseFloat(itemQuantity) * parseFloat(itemPrice);

        cell1.textContent = itemName;
        cell2.textContent = itemType;
        cell3.textContent = itemSize;
        cell4.textContent = itemQuantity;
        cell5.textContent = `₱${parseFloat(itemPrice).toFixed(2)}`;
        cell6.textContent = `₱${totalAmount.toFixed(2)}`;

        // Edit and Delete functionality
        const editButton = document.createElement('button');
        editButton.classList.add('action-btn', 'edit-btn');
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.addEventListener('click', function() {
            document.getElementById('item-name').value = itemName;
            document.getElementById('item-type').value = itemType;
            document.getElementById('item-size').value = itemSize;
            document.getElementById('item-quantity').value = itemQuantity;
            document.getElementById('item-price').value = itemPrice;

            tableBody.deleteRow(newRow.rowIndex);
        });

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('action-btn', 'delete-btn');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.addEventListener('click', function() {
            tableBody.deleteRow(newRow.rowIndex);
        });

        cell7.appendChild(editButton);
        cell7.appendChild(deleteButton);

        document.getElementById('inventory-form').reset();
    });
});

// Function to load inventory from the database (for display)
function loadInventory() {
    fetch('get_inventory.php')  // This file should return the inventory data in JSON format
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#inventory-table tbody');
            tbody.innerHTML = ''; // Clear existing rows

            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.item_name}</td>
                    <td>${item.item_type}</td>
                    <td>${item.item_size}</td>
                    <td>${item.item_quantity}</td>
                    <td>${item.item_price}</td>
                    <td>${(item.item_quantity * item.item_price).toFixed(2)}</td>
                    <td>
                        <button class="edit-btn"><i class="fas fa-edit"></i> Edit</button>
                        <button class="delete-btn"><i class="fas fa-trash-alt"></i> Delete</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to load inventory data.');
        });
}

document.addEventListener("DOMContentLoaded", () => {
    // Toggle Buttons
    const loginBtn = document.getElementById("login-btn");
    const registerBtn = document.getElementById("register-btn");

    // Form Containers
    const loginFormContainer = document.getElementById("login-form-container");
    const registrationFormContainer = document.getElementById("registration-form-container");

    // Add event listeners for toggling forms
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

    // Handle Sign In form submission
    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            // Retrieve existing users from localStorage
            const users = JSON.parse(localStorage.getItem("users")) || [];

            // Check if the user exists with the provided credentials
            const storedUser  = users.find(user => user.username === username && user.password === password);

            if (storedUser ) {
                alert("Login successful!");
                window.location.href = "Home.html"; 
            } else {
                alert("Invalid login credentials!");
            }
        });
    }

    // Handle Registration form submission
    if (registrationForm) {
        registrationForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const username = document.getElementById("reg-username").value;
            const password = document.getElementById("reg-password").value;

            // Get existing users from localStorage or initialize an empty array
            const users = JSON.parse(localStorage.getItem("users")) || [];

            // Check if the username already exists
            const existingUser  = users.find(user => user.username === username);
            if (existingUser ) {
                alert("Username already exists. Please choose a different one.");
                return;
            }

            // Add the new user to the array
            users.push({ username, password, role: "User ", lastLogin: null });

            // Save the updated users array back to localStorage
            localStorage.setItem("users", JSON.stringify(users));

            alert("Registration Successful!");
            window.location.href = "login.html"; // Redirect to login page after registration
        });
    }
});
 // Add Item to Inventory
 document.getElementById('inventory-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const itemName = document.getElementById('item-name').value;
    const itemType = document.getElementById('item-type').value;
    const itemSize = document.getElementById('item-size').value; // Get Size
    const itemQuantity = document.getElementById('item-quantity').value;
    const itemPrice = document.getElementById('item-price').value;

    if (itemName && itemType && itemSize && itemQuantity && itemPrice) {
        const tableBody = document.getElementById('inventory-table').getElementsByTagName('tbody')[0];

        const newRow = tableBody.insertRow(tableBody.rows.length);

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2); // Size Column
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);
        const cell6 = newRow.insertCell(5);

        cell1.textContent = itemName;
        cell2.textContent = itemType;
        cell3.textContent = itemSize; // Add Size
        cell4.textContent = itemQuantity;
        cell5.textContent = `$${parseFloat(itemPrice).toFixed(2)}`;

        // Edit button functionality
        const editButton = document.createElement('button');
        editButton.classList.add('action-btn', 'edit-btn');
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.addEventListener('click', function() {
            document.getElementById('item-name').value = itemName;
            document.getElementById('item-type').value = itemType;
            document.getElementById('item-size').value = itemSize; // Include Size
            document.getElementById('item-quantity').value = itemQuantity;
            document.getElementById('item-price').value = itemPrice;

            // Remove row after editing
            tableBody.deleteRow(newRow.rowIndex - 1);
        });

        // Delete button functionality
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('action-btn', 'delete-btn');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.addEventListener('click', function() {
            tableBody.deleteRow(newRow.rowIndex - 1);
        });

        cell6.appendChild(editButton);
        cell6.appendChild(deleteButton);

        document.getElementById('inventory-form').reset();
    }
});

fetch("sidebar.html")
.then(response => response.text())
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


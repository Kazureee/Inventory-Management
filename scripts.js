document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const inventoryForm = document.getElementById("inventory-form");
    const loginContainer = document.getElementById("login-container");
    const inventoryContainer = document.getElementById("inventory-container");
    const inventoryTableBody = document.querySelector("#inventory-table tbody");

    const validUsername = "admin";
    const validPassword = "password";

    // Login Logic
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === validUsername && password === validPassword) {
            loginContainer.style.display = "none";
            inventoryContainer.style.display = "block";
        } else {
            alert("Invalid login credentials!");
        }
    });

    // Inventory CRUD Logic
    inventoryForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const itemName = document.getElementById("item-name").value;
        const itemType = document.getElementById("item-type").value;
        const itemQuantity = document.getElementById("item-quantity").value;
        const itemPrice = document.getElementById("item-price").value;

        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td>${itemName}</td>
            <td>${itemType}</td>
            <td>${itemQuantity}</td>
            <td>${itemPrice}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;

        // Edit Button Logic
        newRow.querySelector(".edit-btn").addEventListener("click", () => {
            document.getElementById("item-name").value = itemName;
            document.getElementById("item-type").value = itemType;
            document.getElementById("item-quantity").value = itemQuantity;
            document.getElementById("item-price").value = itemPrice;
            newRow.remove();
        });

        // Delete Button Logic
        newRow.querySelector(".delete-btn").addEventListener("click", () => {
            newRow.remove();
        });

        inventoryTableBody.appendChild(newRow);
        inventoryForm.reset();
    });
});

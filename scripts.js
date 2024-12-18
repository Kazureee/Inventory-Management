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
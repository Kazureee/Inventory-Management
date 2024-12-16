document.addEventListener("DOMContentLoaded", () => {
    // Get the buttons and forms
    const loginForm = document.getElementById("login-form");
    const registrationForm = document.getElementById("registration-form");

    // Handle Sign In form submission
    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            const storedUser = localStorage.getItem("username");
            const storedPassword = localStorage.getItem("password");

            if (username === storedUser && password === storedPassword) {
                alert("Login successful!");
                window.location.href = "inventory.html"; // Redirect to a dashboard or inventory page
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

            localStorage.setItem("username", username);
            localStorage.setItem("password", password);

            alert("Registration Successful!");
            window.location.href = "login.html"; // Redirect to login page after registration
        });
    }

    // Toggle buttons for navigation
    const registerBtn = document.getElementById("register-btn");
    const loginBtn = document.getElementById("login-btn");

    if (registerBtn) {
        registerBtn.addEventListener("click", () => {
            window.location.href = "registration.html";
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            window.location.href = "login.html";
        });
    }

    // Set correct button active on page load
    const currentPage = window.location.pathname;
    if (currentPage.includes("registration.html")) {
        document.getElementById("register-btn").classList.add("active");
        document.getElementById("login-btn").classList.remove("active");
    } else if (currentPage.includes("login.html")) {
        document.getElementById("login-btn").classList.add("active");
        document.getElementById("register-btn").classList.remove("active");
    }
});

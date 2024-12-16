document.addEventListener("DOMContentLoaded", () => {
    // Get the buttons and forms
    const loginForm = document.getElementById("login-form");
    const registrationForm = document.getElementById("registration-form");

    const validUsername = "admin";
    const validPassword = "password";

    // Handle Sign In form submission
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Validate login credentials
        if (username === validUsername && password === validPassword) {
            alert("Login successful!");
            window.location.href = "inventory.html"; // Redirect to a dashboard or inventory page
        } else {
            alert("Invalid login credentials!");
        }
    });

    // Handle Registration form submission
    registrationForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("reg-username").value;
        const email = document.getElementById("reg-email").value;
        const password = document.getElementById("reg-password").value;

        alert(`Registration Successful!\nUsername: ${username}\nEmail: ${email}`);
        window.location.href = "login.html"; // Redirect to login page after registration
    });

    // Sign Up button click event (Redirect to registration page)
    const registerBtn = document.getElementById("register-btn");
    registerBtn.addEventListener("click", () => {
        window.location.href = "registration.html";
    });

    // Sign In button click event (Redirect to login page)
    const loginBtn = document.getElementById("login-btn");
    loginBtn.addEventListener("click", () => {
        window.location.href = "login.html";
    });

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

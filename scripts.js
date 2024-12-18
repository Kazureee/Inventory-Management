document.addEventListener("DOMContentLoaded", () => {
    // Get the buttons and forms (if necessary)
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
});

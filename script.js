// Get form and message element
const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

// When the user submits the form
loginForm.addEventListener("submit", async function (event) {

    // Prevent page from refreshing
    event.preventDefault();

    // Read input values
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    try {

        // Fetch users from users.json
        const response = await fetch("users.json");

        // Convert JSON data into JavaScript object
        const users = await response.json();

        // Check if username and password match
        const validUser = users.find(user =>
            user.username === username &&
            user.password === password
        );

        if (validUser) {

            message.style.color = "green";
            message.textContent = "Login Successful!";

            // Redirect after 1 second
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1000);

        } else {

            message.style.color = "red";
            message.textContent = "Invalid username or password.";

        }

    } catch (error) {

        message.style.color = "red";
        message.textContent = "Unable to load user data.";

        console.error(error);

    }

});
document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");
    const emailOrPhone = document.getElementById("emailOrPhone");
    const password = document.getElementById("password");
    const remember = document.getElementById("remember");
    const loginMessage = document.getElementById("loginMessage");
    const showPassword = document.getElementById("showPassword");


    // Show / Hide Password
    showPassword.addEventListener("click", function () {

        if (password.type === "password") {

            password.type = "text";

            showPassword.innerHTML =
                '<i class="bi bi-eye-slash"></i>';

        } else {

            password.type = "password";

            showPassword.innerHTML =
                '<i class="bi bi-eye"></i>';
        }

    });


    // Login
    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const loginValue = emailOrPhone.value.trim();
        const userPassword = password.value.trim();


        // Clear old message
        loginMessage.innerHTML = "";


        // Email validation
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        // Phone validation
        const phonePattern =
            /^[0-9]{10}$/;


        // Empty input
        if (loginValue === "") {

            showMessage(
                "Please enter your email or phone number.",
                "danger"
            );

            return;
        }


        // Invalid email and phone
        if (
            !emailPattern.test(loginValue) &&
            !phonePattern.test(loginValue)
        ) {

            showMessage(
                "Enter a valid email or 10-digit phone number.",
                "danger"
            );

            return;
        }


        // Empty password
        if (userPassword === "") {

            showMessage(
                "Please enter your password.",
                "danger"
            );

            return;
        }


        // Password length
        if (userPassword.length < 6) {

            showMessage(
                "Password must be at least 6 characters.",
                "danger"
            );

            return;
        }


        // Get registered user
        const storedUser =
            localStorage.getItem("spinnyUser");


        // No registered user
        if (!storedUser) {

            showMessage(
                "No account found. Please sign up first.",
                "warning"
            );

            return;
        }


        const user = JSON.parse(storedUser);


        // Check email/phone
        const validUser =
            user.email === loginValue ||
            user.phone === loginValue;


        // Check password
        const validPassword =
            user.password === userPassword;


        // Invalid login
        if (!validUser || !validPassword) {

            showMessage(
                "Invalid email/phone number or password.",
                "danger"
            );

            return;
        }


        // Successful login
        const loggedInUser = {

            name: user.name,
            email: user.email,
            phone: user.phone,
            loggedIn: true

        };


        localStorage.setItem(
            "spinnyLoggedInUser",
            JSON.stringify(loggedInUser)
        );


        // Remember me
        if (remember.checked) {

            localStorage.setItem(
                "spinnyRememberMe",
                "true"
            );

        } else {

            localStorage.removeItem(
                "spinnyRememberMe"
            );
        }


        // Success message
        showMessage(
            "Login successful!",
            "success"
        );


        // Redirect
        setTimeout(function () {

            window.location.href = "profile.html";

        }, 1000);

    });


    // Bootstrap alert function
    function showMessage(message, type) {

        loginMessage.innerHTML = `
            <div class="alert alert-${type}" role="alert">
                ${message}
            </div>
        `;

    }

});
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

// ===============================
// SIGNUP VALIDATION
// ===============================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Get values
        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const terms = document.getElementById("terms").checked;

        // Error elements
        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const phoneError = document.getElementById("phoneError");
        const passwordError = document.getElementById("passwordError");
        const confirmPasswordError =
            document.getElementById("confirmPasswordError");
        const termsError = document.getElementById("termsError");

        // Clear errors
        nameError.textContent = "";
        emailError.textContent = "";
        phoneError.textContent = "";
        passwordError.textContent = "";
        confirmPasswordError.textContent = "";
        termsError.textContent = "";

        let isValid = true;

        // Name validation
        if (fullName === "") {
            nameError.textContent = "Please enter your full name.";
            isValid = false;
        }

        // Email validation
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {
            emailError.textContent = "Please enter your email.";
            isValid = false;
        } 
        else if (!emailPattern.test(email)) {
            emailError.textContent = "Please enter a valid email.";
            isValid = false;
        }

        // Phone validation
        const phonePattern = /^[0-9]{10}$/;

        if (phone === "") {
            phoneError.textContent = "Please enter your phone number.";
            isValid = false;
        } 
        else if (!phonePattern.test(phone)) {
            phoneError.textContent =
                "Phone number must contain exactly 10 digits.";
            isValid = false;
        }

        // Password validation
        if (password === "") {
            passwordError.textContent = "Please create a password.";
            isValid = false;
        } 
        else if (password.length < 6) {
            passwordError.textContent =
                "Password must contain at least 6 characters.";
            isValid = false;
        }

        // Confirm password
        if (confirmPassword === "") {
            confirmPasswordError.textContent =
                "Please confirm your password.";
            isValid = false;
        } 
        else if (password !== confirmPassword) {
            confirmPasswordError.textContent =
                "Passwords do not match.";
            isValid = false;
        }

        // Terms
        if (!terms) {
            termsError.textContent =
                "Please accept the Terms & Conditions.";
            isValid = false;
        }

        // Stop if validation failed
        if (!isValid) {
            return;
        }

        // Check existing user
        const existingUser =
            JSON.parse(localStorage.getItem("spinnyUser"));

        if (existingUser &&
            (existingUser.email === email ||
             existingUser.phone === phone)) {

            alert("An account with this email or phone already exists.");
            return;
        }

        // Create user object
        const user = {
            fullName: fullName,
            email: email,
            phone: phone,
            password: password
        };

        // Save user
        localStorage.setItem(
            "spinnyUser",
            JSON.stringify(user)
        );

        // Success message
        document.getElementById("successMessage").innerHTML =
            '<div class="alert alert-success">' +
            'Account created successfully! Redirecting to login...' +
            '</div>';

        // Clear form
        signupForm.reset();

        // Redirect to login
        setTimeout(function () {
            window.location.href = "login.html";
        }, 1500);

    });
}


// ===============================
// SHOW / HIDE PASSWORD
// ===============================

const togglePassword =
    document.getElementById("togglePassword");

if (togglePassword) {

    togglePassword.addEventListener("click", function () {

        const password =
            document.getElementById("password");

        const icon =
            this.querySelector("i");

        if (password.type === "password") {

            password.type = "text";

            icon.classList.remove("bi-eye");
            icon.classList.add("bi-eye-slash");

        } else {

            password.type = "password";

            icon.classList.remove("bi-eye-slash");
            icon.classList.add("bi-eye");

        }

    });
}


// ===============================
// SHOW / HIDE CONFIRM PASSWORD
// ===============================

const toggleConfirmPassword =
    document.getElementById("toggleConfirmPassword");

if (toggleConfirmPassword) {

    toggleConfirmPassword.addEventListener("click", function () {

        const confirmPassword =
            document.getElementById("confirmPassword");

        const icon =
            this.querySelector("i");

        if (confirmPassword.type === "password") {

            confirmPassword.type = "text";

            icon.classList.remove("bi-eye");
            icon.classList.add("bi-eye-slash");

        } else {

            confirmPassword.type = "password";

            icon.classList.remove("bi-eye-slash");
            icon.classList.add("bi-eye");

        }

    });
}
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const user = document.getElementById('user');
    const loginSignup = document.getElementById('login-signup');
    const toastElement = document.getElementById('liveToast');
    const toastBody = toastElement.querySelector('.toast-body');    
    const toast = new bootstrap.Toast(toastElement);

    window.addEventListener('load', function () {
        const modal = new bootstrap.Modal(loginsignup);
        if (!JSON.parse(localStorage.getItem('currentUser'))) {
            modal.show();
        }
    });
    
    // Function to check and update user status
    function checkUserStatus() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.status) {
            document.getElementById('userName').textContent = currentUser.name;
            user.style.display = 'inline-block';
            loginSignup.style.display = 'none';
        } else {
            document.getElementById('userName').textContent = '';
            user.style.display = 'none';
            loginSignup.style.display = 'inline-block';
        }
    }

    // Check user status on page load
    checkUserStatus();


    // Handle signup form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the form from submitting normally
        // Get user input
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        
        // Check if passwords match
        if (password !== confirmPassword) {
            toastBody.textContent = 'Passwords do not match';
            toast.show();
            return;
        }

        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const isUserExist = users.find((user) => user.email === email);

        if (isUserExist) {
            // User already exists
            toastBody.textContent = 'User already exists';
            toast.show();
        } else {
            // Create new user
            const newUser = { name, email, password, status: true };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(newUser));

            // Update UI
            checkUserStatus();

            // Show success message
            toastBody.textContent = 'Sign up successful! You are now logged in.';
            toast.show();

            // Close the modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('loginsignup'));
            modal.hide();

            // Clear the form
            signupForm.reset();
        }
    });

    // Handle login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the form from submitting normally
        // Get user input
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Check if user exists and credentials are correct
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            user.status = true;
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('users', JSON.stringify(users));

            // Update UI
            checkUserStatus();

            // Show success message
            toastBody.textContent = 'Login successful!';
            toast.show();

            // Close the modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('loginsignup'));
            modal.hide();

            // Clear the form
            loginForm.reset();
        } else {
            toastBody.textContent = 'Invalid email or password';
            toast.show();
        }
    });

    // Logout functionality
    const logoutButton = document.getElementById('logout-button');
    
    logoutButton.addEventListener('click', function() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            
            const updatedUsers = users.map((user) => {
                if (user.email === currentUser.email) {
                    return { user, status: false };
                }
                return user;
            });

            localStorage.setItem('users', JSON.stringify(updatedUsers));
            localStorage.removeItem('currentUser');

            // Update UI
            checkUserStatus();

            // Show logout message
            toastBody.textContent = 'You have been logged out successfully.';
            toast.show();
        }
    });
});


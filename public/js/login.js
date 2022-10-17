//TODO add html for wrong password and email 

// Login form
const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

//Signup button
const signupFormSwitch = async (event) => {
    event.preventDefault();

    const btnResponse = await fetch('/signup', {
        method: 'GET'
    });
    if (btnResponse.ok) {
        document.location.replace('/signup')
    } else {
        alert(btnResponse.statusText);
    }

};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
document.getElementById('signup-btn').addEventListener('click', signupFormSwitch);
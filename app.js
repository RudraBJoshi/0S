// Basic in-memory user data for testing
let users = JSON.parse(localStorage.getItem('users')) || {};

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const desktop = document.getElementById('desktop');
const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');
const fileInput = document.getElementById('file-input');
const fileSystem = document.getElementById('file-system');
const uploadBtn = document.getElementById('upload-btn');
const downloadBtn = document.getElementById('download-btn');
const logoutBtn = document.getElementById('logout-btn');

// Simulating a login system with password management
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (users[username] && users[username] === password) {
        showDesktop();
    } else {
        errorMessage.textContent = 'Invalid username or password!';
    }
});

// Show the desktop
function showDesktop() {
    loginScreen.classList.add('hidden');
    desktop.classList.remove('hidden');
}

// Logout button functionality
logoutBtn.addEventListener('click', function () {
    loginScreen.classList.remove('hidden');
    desktop.classList.add('hidden');
});

// File upload functionality
uploadBtn.addEventListener('click', function () {
    fileInput.click(); // Open file dialog
});

fileInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const content = e.target.result;
            addFileToSystem(file.name, content);
        };
        reader.readAsText(file);
    }
});

function addFileToSystem(fileName, content) {
    const fileDiv = document.createElement('div');
    fileDiv.className = 'file';
    fileDiv.textContent = fileName;
    fileDiv.addEventListener('click', function () {
        downloadFile(fileName, content);
    });
    fileSystem.appendChild(fileDiv);
}

function downloadFile(fileName, content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
}

// Create users (for testing)
if (Object.keys(users).length === 0) {
    users['admin'] = 'password123'; // Predefined user for testing
    localStorage.setItem('users', JSON.stringify(users));
}

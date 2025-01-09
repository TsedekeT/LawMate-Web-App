// Function to validate email address format
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(String(email).toLowerCase());
}

// Example usage:
const email = "example@domain.com";
if (validateEmail(email)) {
  console.log("Valid email address.");
} else {
  console.log("Invalid email address.");
}

// Get elements
const clientBtn = document.getElementById('clientBtn');
const lawyerBtn = document.getElementById('lawyerBtn');
const signupModal = document.getElementById('signup');
const loginModal = document.getElementById('login');
const home = document.getElementById('home');
const toLogin = document.getElementById('toLogin');
const toSignup = document.getElementById('toSignup');
const signupSubmit = document.getElementById('signupSubmit');
const loginSubmit = document.getElementById('loginSubmit');
const signupRoleSelect = document.getElementById('role');
const loginRoleSelect = document.getElementById('role'); // You can use different IDs for login and signup if needed

// Show Signup Modal
function showSignup() {
  signupModal.style.display = 'block';
  home.classList.add('blurred');
}

// Show Login Modal
function showLogin() {
  loginModal.style.display = 'block';
  home.classList.add('blurred');
}

// Hide all Modals
function hideModals() {
  signupModal.style.display = 'none';
  loginModal.style.display = 'none';
  home.classList.remove('blurred');
}

// Event Listeners
clientBtn.addEventListener('click', showSignup);
lawyerBtn.addEventListener('click', showSignup);
toLogin.addEventListener('click', (e) => {
  e.preventDefault();
  hideModals();
  showLogin();
});
toSignup.addEventListener('click', (e) => {
  e.preventDefault();
  hideModals();
  showSignup();
});

// Handle signup submit
signupSubmit.addEventListener('click', () => {
  const selectedRole = signupRoleSelect.value;
  const emailcheck = document.getElementById('email').value;
  if (selectedRole === 'client' && validateEmail(emailcheck)) {
    window.location.href = '../pages/client.html';  // Redirect to the Client page
    alert('Signed up successfully!');
  } else if (selectedRole === 'lawyer' && validateEmail(emailcheck)) {
    window.location.href = '../pages/Lawyer.html';  // Redirect to the Lawyer page
    alert('Signed up successfully!');
  }
  else{
    alert('Invalid email address!');
  }
  hideModals();
});

// Handle login submit
loginSubmit.addEventListener('click', () => {
  const selectedRole = loginRoleSelect.value;
  const emailcheck = document.getElementById('email').value;
  if (selectedRole === 'client' && validateEmail(emailcheck)) {
    window.location.href = '../pages/client.html';  // Redirect to the Client page
    alert('Logged in successfully!');
  } else if (selectedRole === 'lawyer' && validateEmail(emailcheck)) {
    window.location.href = '../pages/Lawyer.html';  // Redirect to the Lawyer page
    alert('Logged in successfully!');
  } else{
    alert('Invalid email address!');
  }
  hideModals();
});

// Close modal on outside click
window.addEventListener('click', (e) => {
  if (e.target === signupModal || e.target === loginModal) {
    hideModals();
  }
});

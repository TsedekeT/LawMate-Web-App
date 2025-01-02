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
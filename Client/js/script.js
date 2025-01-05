



/*the home page javascript*/
const text = "WELCOME TO LAW MATE"; // Text to be typed
const speed = 100; // Typing speed in milliseconds
const pauseBetweenRepeats = 1000; // Pause before restarting
let index = 0;

function typeEffect() {
    const header = document.getElementById('header');
    
    if (index < text.length) {
        header.textContent += text.charAt(index); // Add one character at a time
        index++;
        setTimeout(typeEffect, speed); // Recursive call for the next character
    } else {
        // Pause, then restart the animation
        setTimeout(() => {
            header.textContent = ""; // Clear the text
            index = 0; // Reset index
            typeEffect(); // Restart the typing animation
        }, pauseBetweenRepeats);
    }
}

// Start the typing animation
window.addEventListener('load', typeEffect);

function togglePasswordVisibility(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);

    icon.addEventListener("click", () => {
      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      icon.innerHTML = isPassword
        ? '<i class="fa-regular fa-eye"></i>'
        : '<i class="fa-regular fa-eye-slash"></i>';
    });
  }

  togglePasswordVisibility("password", "togglePassword");
  togglePasswordVisibility("confirm-password", "toggleConfirmPassword");

  // Password validation regex patterns
  const passwordRequirements = {
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    number: /[0-9]/,
    specialCharacter: /[!@#$%^&*(),.?":{}|<>]/,
  };

  // Handle form submission
  document
    .getElementById("signupForm")
    .addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent the form from submitting normally

      const errorContainer = document.getElementById("error-container");
      errorContainer.style.display = "none"; // Hide error message by default
      errorContainer.textContent = "";

      const role = document.getElementById("role").value;
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document
        .getElementById("confirm-password")
        .value.trim();
      const lawyerFile =
        document.getElementById("lawyer-file-upload").files[0];

      // Check if all fields are filled
      if (!role || !name || !email || !password || !confirmPassword) {
        showError("All fields are required.");
        return;
      }

      // Check password requirements
      if (!isValidPassword(password)) {
        showError(
          "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character."
        );
        return;
      }

      // Check if password and confirm password match
      if (password !== confirmPassword) {
        showError("Passwords do not match.");
        return;
      }

      // If role is "lawyer", check if file is uploaded
      if (role === "lawyer" && !lawyerFile) {
        showError("Please upload your lawyer certificate.");
        return;
      }

      // If everything is valid, show success message
      alert("You have successfully registered! 🎉");
      document.getElementById("signupForm").reset();
    });

  // Function to show error messages
  function showError(message) {
    const errorContainer = document.getElementById("error-container");
    errorContainer.style.display = "block";
    errorContainer.textContent = message;
  }

  // Function to validate password strength
  function isValidPassword(password) {
    return (
      passwordRequirements.uppercase.test(password) &&
      passwordRequirements.lowercase.test(password) &&
      passwordRequirements.number.test(password) &&
      passwordRequirements.specialCharacter.test(password)
    );
  }

  // Show/hide lawyer-specific file upload based on role selection
  document.getElementById("role").addEventListener("change", function () {
    const lawyerFileSection = document.getElementById("lawyer-file");
    if (this.value === "lawyer") {
      lawyerFileSection.style.display = "block"; // Show file upload for lawyer
    } else {
      lawyerFileSection.style.display = "none"; // Hide file upload for client
    }
  });
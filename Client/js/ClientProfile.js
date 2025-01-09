const menu = document.querySelector('.menu-toggle');
menu.addEventListener('click', function () {
  document.querySelector('.sidebar').classList.toggle('open');
});

const sidebarLinks = document.querySelectorAll('.sidebar a');
const sidebar = document.querySelector('.sidebar');

// Add event listeners to all sidebar links
sidebarLinks.forEach(link => {
  link.addEventListener('click', function () {
    sidebar.classList.remove('open'); // Remove the 'open' class to close the sidebar
  });
});

// Add event listener to the logo image
const logoImage = document.querySelector('.sidebar .logo img');
logoImage.addEventListener('click', function() {
  // Redirect to the homepage when clicked
  window.location.href = '../pages/home.html';  // Replace with your home page URL
});
// Handle form submission
const UpdatePro = document.querySelector('.edit-profile-form');
UpdatePro.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form from reloading the page

    // Get updated values from the form inputs
    const updatedName = document.getElementById('name').value;
    const updatedEmail = document.getElementById('email').value;
    const updatedPhone = document.getElementById('phone').value;
    const updatedNotificationMode = document.getElementById('notification-mode').value;

    // Update the profile section
    document.querySelector('#profile p:nth-child(1)').textContent = `Name: ${updatedName}`;
    document.querySelector('#profile p:nth-child(2)').textContent = `Email: ${updatedEmail}`;
    document.querySelector('#profile p:nth-child(3)').textContent = `Phone: ${updatedPhone}`;

    // Handle profile picture update if provided
    const profilePicInput = document.getElementById('profile-pic');
    if (profilePicInput.files && profilePicInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.querySelector('#profile img').src = e.target.result; // Update profile picture
      };
      reader.readAsDataURL(profilePicInput.files[0]);
    }

    // Display notification preference to the user
    alert(`Profile updated successfully! Notification Mode: ${updatedNotificationMode}`);
  });

const profileData = { name: updatedName, email: updatedEmail, phone: updatedPhone, notificationMode: updatedNotificationMode };
localStorage.setItem('clientProfile', JSON.stringify(profileData));
  

// Add event listener to the logo image
const logoImage = document.querySelector('.sidebar .logo img');

logoImage.addEventListener('click', function() {
// Redirect to the homepage when clicked
  window.location.href = '../pages/home.html';  // Replace with your home page URL
});
  // Handle form submission
  const updatePro = document.querySelector('.edit-profile-form');
  updatePro.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form from reloading the page

    // Get updated values from the form inputs
    const updatedName = document.getElementById('name').value;
    const updatedEmail = document.getElementById('email').value;
    const updatedPhone = document.getElementById('phone').value;
    const updatedSpecialization = document.getElementById('specialization').value;
    const updatedBankAccount = document.getElementById('bank-account').value;

    // Update the profile section
    document.querySelector('#profile p:nth-child(1)').textContent = `Name: ${updatedName}`;
    document.querySelector('#profile p:nth-child(2)').textContent = `Email: ${updatedEmail}`;
    document.querySelector('#profile p:nth-child(3)').textContent = `Phone: ${updatedPhone}`;
    document.querySelector('#profile p:nth-child(4)').textContent = `Specialization: ${updatedSpecialization}`;
    document.querySelector('#profile p:nth-child(5)').textContent = `Bank Account: ${updatedBankAccount}`;

    // Handle profile picture update if provided
    const profilePicInput = document.getElementById('profile-pic');
    if (profilePicInput.files && profilePicInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.querySelector('#profile img').src = e.target.result; // Update profile picture
      };
      reader.readAsDataURL(profilePicInput.files[0]);
    }

    alert('Profile updated successfully!');
  });


localStorage.setItem('profileData', JSON.stringify({ name: updatedName, email: updatedEmail, phone: updatedPhone, specialization: updatedSpecialization, bankAccount: updatedBankAccount }));

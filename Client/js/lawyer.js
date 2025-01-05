const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('full_name', fullName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirm_password', confirmPassword);
    formData.append('specialization', specialization);
    formData.append('phone_number', phoneNumber);
    formData.append('lawyer_credentials', lawyerCredentialsFile); // The file input

    try {
        const response = await fetch('/api/lawyer/signUp', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        if (response.ok) {
            console.log(data.message);
        } else {
            console.error(data.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

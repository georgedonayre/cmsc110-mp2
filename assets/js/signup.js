function togglePassword(fieldId) {
    const passwordField = document.getElementById(fieldId);
    const icon = passwordField.nextElementSibling.querySelector('i');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        icon.classList.remove('bi-eye-slash');
        icon.classList.add('bi-eye');
    } else {
        passwordField.type = 'password';
        icon.classList.remove('bi-eye');
        icon.classList.add('bi-eye-slash');
    }
}
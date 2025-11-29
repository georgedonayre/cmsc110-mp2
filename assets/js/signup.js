function togglePassword() {
    const passwordField = document.getElementById('password');
    const eyeIcon = document.querySelector('.bi-eye-slash, .bi-eye');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        eyeIcon.classList.replace('bi-eye-slash', 'bi-eye');
    } else {
        passwordField.type = 'password';
        eyeIcon.classList.replace('bi-eye', 'bi-eye-slash');
    }
}
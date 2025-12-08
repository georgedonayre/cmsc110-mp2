const startingMinutes = 5;
let time = startingMinutes * 60;
const resetBtn = document.getElementById('reset');
resetBtn.disabled = true;
const countdownEl = document.getElementById('countdown');
const countdownInterval = setInterval(updateCountdown, 1000);

function updateCountdown(){
    if (time < 0) {
        resetBtn.disabled = false;
        clearInterval(countdownInterval);
        countdownEl.innerHTML = "00:00";
        return;
    }
    resetBtn.disabled = true;
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    countdownEl.innerHTML = `${minutes}:${seconds}`;
    time--;
}

document.getElementById('reset').addEventListener('click', function() {
time = startingMinutes * 60;
updateCountdown();
clearInterval(countdownInterval);
countdownInterval = setInterval(updateCountdown, 1000);
});

document.getElementById('SignInForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const otpInput = document.getElementById('otp').value;
    if (otpInput.length == 8) {
        window.location.href = "index.html"
    }
});
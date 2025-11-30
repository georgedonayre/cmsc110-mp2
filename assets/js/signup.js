function togglePassword(fieldId) {
  const passwordField = document.getElementById(fieldId);
  const icon = passwordField.nextElementSibling.querySelector("i");

  if (passwordField.type === "password") {
    passwordField.type = "text";
    icon.classList.remove("bi-eye-slash");
    icon.classList.add("bi-eye");
  } else {
    passwordField.type = "password";
    icon.classList.remove("bi-eye");
    icon.classList.add("bi-eye-slash");
  }
}

// document.getElementById("SignUpForm").onsubmit = function (event) {
//   event.preventDefault();

//   window.location.href = "index.html";
//   alert("Sign in successful!");
// };

const form = document.querySelector("#SignUpForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  const res = await fetch(`http://localhost:3001/users?email=${email}`);
  const existingUsers = await res.json();

  if (existingUsers.length > 0) {
    alert("You already have an account.");
    return;
  }

  // when the code is in this part it means there is no user so we have to create one.

  await fetch("http://localhost:3001/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  alert("Sign up successful");
  window.location.href = "signin.html";
});

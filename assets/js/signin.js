const form = document.querySelector("#SignInForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const res = await fetch(
    `http://localhost:3001/users?email=${email}&password=${password}`
  );

  const users = await res.json();

  if (users.length === 0) {
    alert("Invalid credentials");
    return;
  }

  const user = users[0];
  localStorage.setItem("userId", user.id);
  localStorage.setItem("username", user.username);
  localStorage.setItem("isLoggedIn", "true");

  alert("login successful");
  window.location.href = "index.html";
});

fetch("header.html")
  .then((res) => res.text())
  .then((data) => {
    document.querySelector("#header").innerHTML = data;

    const currentPage = window.location.pathname.split("/").pop();
    console.log(currentPage);

    document.querySelectorAll(".nav-link").forEach((link) => {
      const linkPage = link.getAttribute("href");
      if (linkPage === currentPage) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // account authentication sa navbar
    const accountNav = document.querySelector("#account-nav");
    const logoutNav = document.querySelector("#logout-nav");
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const username = localStorage.getItem("username");

    if (isLoggedIn === "true") {
      accountNav.innerHTML = `
     <a class="nav-link" href="account.html">
          <i class="bi bi-person"></i> Hello, ${username}
        </a>
    `;

      logoutNav.innerHTML = `
      <a class="nav-link text-danger" href="#" id="logout-btn">
          Logout
        </a>
    `;

      document.getElementById("logout-btn").addEventListener("click", () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");

        alert("You have been logged out.");
        window.location.href = "index.html";
      });
    } else {
      accountNav.innerHTML = `
     <a class="nav-link" href="account.html">
          <i class="bi bi-person"></i> Sign In
        </a>
    `;
    }
  });

fetch("footer.html")
  .then((res) => res.text())
  .then((data) => {
    document.querySelector("#footer").innerHTML = data;
  });

const setFavicon = (href) => {
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.getElementsByTagName("head")[0].appendChild(link);
  }
  link.href = href;
};

setFavicon("/assets/img/favicon.ico");

const searchBtn = document.querySelector("#searchBtn");
const searchInput = document.querySelector("#searchInput");

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    // move to products.html?query=${query}
    window.location.href = `products.html?query=${encodeURIComponent(query)}`;
  } else {
    alert("tanga lang?");
  }
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

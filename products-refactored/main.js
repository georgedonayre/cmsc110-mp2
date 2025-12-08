let allProducts = [];

document.addEventListener("DOMContentLoaded", async () => {
  await getProducts();
  displayProducts();
});

// get the products info from the json file
async function getProducts() {
  try {
    const response = await fetch("products.json");
    const data = await response.json();
    allProducts = data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function displayProducts() {
  const productsContainer = document.querySelector("#productsContainer");

  if (!productsContainer) {
    console.error("Products container not found");
    return;
  }

  if (allProducts.length === 0) {
    productsContainer.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="bi bi-inbox fs-1 text-muted"></i>
        <p class="text-muted mt-3">No products available.</p>
      </div>
    `;
    return;
  }

  productsContainer.innerHTML = allProducts
    .map((product) => createProductCard(product))
    .join("");
}

// creates the html for each product card
function createProductCard(product) {
  const priceDisplay = product.priceMax
    ? `₱${product.price.toFixed(2)} - ₱${product.priceMax.toFixed(2)}`
    : `₱${product.price.toFixed(2)}`;

  const stockBadge = product.inStock
    ? '<span class="badge bg-success">In Stock</span>'
    : '<span class="badge bg-danger">Out of Stock</span>';

  return `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card h-100 shadow-sm product-card">
        <img
          src="${product.image}"
          class="card-img-top"
          alt="${product.name}"
          style="height: 200px; object-fit: cover;"
        />
        <div class="card-body d-flex flex-column">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <h5 class="card-title mb-0">${product.name}</h5>
            ${stockBadge}
          </div>
          <p class="card-text text-muted small">${product.description}</p>
          <p class="text-muted small mb-2"><i class="bi bi-tag"></i> ${
            product.unit
          }</p>
          <div class="mt-auto">
            <div class="d-flex justify-content-between align-items-center">
              <span class="h5 text-primary mb-0">${priceDisplay}</span>
              <button 
                class="btn btn-primary btn-sm" 
                ${!product.inStock ? "disabled" : ""}
              >
                <i class="bi bi-cart-plus"></i> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

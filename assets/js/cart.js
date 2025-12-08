let allProducts = [];
let cart = {};

document.addEventListener("DOMContentLoaded", async () => {
  await getProducts();
  getCart();
  displayCart();
});

async function getProducts() {
  try {
    const response = await fetch("/products.json");
    const data = await response.json();
    allProducts = data.products;
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

function getCart() {
  cart = JSON.parse(localStorage.getItem("cart")) || {};
}

// populates out html
function displayCart() {
  const cartItemsContainer = document.querySelector("#cartItemsContainer");
  const orderSummaryContainer = document.querySelector(".order-summary");

  if (!cartItemsContainer || !orderSummaryContainer) {
    console.error("cart container missing, check query selector");
    return;
  }
  // fetch items from products.json using the product id stored in local storage
  const cartItems = Object.keys(cart)
    .map((productId) => {
      const product = allProducts.find((p) => p.id === parseInt(productId));
      if (product) {
        return {
          ...product, // basically spreads product props
          quantity: cart[productId].quantity,
        };
      }
      return null;
    })
    .filter((item) => item !== null); // removes all null entries

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0); // intial value 0, iterated over the array, accumulates item quantities store it to sum

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="text-center py-5">
        <i class="bi bi-cart-x fs-1 text-muted"></i>
        <h3 class="mt-3">Your cart is empty</h3>
        <p class="text-muted">Add some products to get started!</p>
        <a href="products-ref.html" class="btn btn-primary mt-3">
          <i class="bi bi-arrow-left"></i> Continue Shopping
        </a>
      </div>
    `;
    updateOrderSummary(0, 0);
    return;
  }

  // populates cart items using loop
  const cartHTML = `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Your Supplies</h2>
      <span class="text-muted">${itemCount} item${
    itemCount !== 1 ? "s" : ""
  }</span>
    </div>
    ${cartItems.map((item) => createCartItemHTML(item)).join("")}
    <div class="mt-4">
      <a href="products-ref.html" class="btn btn-outline-primary">
        <i class="bi bi-arrow-left"></i> Continue shopping
      </a>
    </div>
  `;

  cartItemsContainer.innerHTML = cartHTML;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  updateOrderSummary(itemCount, subtotal);

  // must call this after everything is loaded
  setupCartEventListeners();
}

// util function for creating html for each cart item
function createCartItemHTML(item) {
  const totalPrice = item.price * item.quantity;

  return `
    <div class="cart-item shadow">
      <div class="row align-items-center">
        <div class="col-md-2 col-3">
          <img src="${item.image}" alt="${item.name}" class="img-fluid" />
        </div>
        <div class="col-md-4 col-9">
          <h5 class="mb-1">${item.name}</h5>
          <p class="text-muted mb-0 small">${item.unit}</p>
        </div>
        <div class="col-md-3 col-6 mt-3 mt-md-0">
          <div class="quality-control d-flex align-items-center">
            <button class="btn btn-outline-secondary btn-sm decrease-btn" data-product-id="${
              item.id
            }">-</button>
            <input
              type="number"
              class="form-control form-control-sm quantity-input"
              value="${item.quantity}"
              min="1"
              data-product-id="${item.id}"
              readonly
            />
            <button class="btn btn-outline-secondary btn-sm increase-btn" data-product-id="${
              item.id
            }">+</button>
          </div>
        </div>
        <div class="col-md-2 col-4 mt-3 mt-md-0 text-end">
          <p class="mb-0 fw-bold">₱${totalPrice.toFixed(2)}</p>
          <small class="text-muted">₱${item.price.toFixed(2)} each</small>
        </div>
        <div class="col-md-1 col-2 mt-3 mt-md-0 text-end">
          <button class="btn btn-link text-danger p-0 remove-btn" data-product-id="${
            item.id
          }">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

// updates summary
function updateOrderSummary(itemCount, subtotal) {
  const shippingFee = subtotal > 0 ? 100 : 0;
  const total = subtotal + shippingFee;

  const summaryHTML = `
    <h4 class="mb-4">Order summary</h4>
    <div class="d-flex justify-content-between mb-2">
      <span>Subtotal (${itemCount} item${itemCount !== 1 ? "s" : ""})</span>
      <span>₱${subtotal.toFixed(2)}</span>
    </div>
    <div class="d-flex justify-content-between mb-2">
      <span>Shipping fee</span>
      <span>₱${shippingFee.toFixed(2)}</span>
    </div>
    <hr />
    <div class="d-flex justify-content-between mb-4">
      <strong>Total</strong>
      <strong class="text-primary-emphasis h5 mb-0">₱${total.toFixed(
        2
      )}</strong>
    </div>
    <button class="btn btn-primary w-100 btn-lg mb-2" ${
      itemCount === 0 ? "disabled" : ""
    }>Checkout</button>
  `;

  const summaryContainer = document.querySelector(".order-summary");
  if (summaryContainer) {
    summaryContainer.innerHTML = summaryHTML;
  }
}

function setupCartEventListeners() {
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = e.currentTarget.dataset.productId;
      removeFromCart(productId);
    });
  });

  document.querySelectorAll(".increase-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = e.currentTarget.dataset.productId;
      updateQty(productId, 1);
    });
  });

  document.querySelectorAll(".decrease-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = e.currentTarget.dataset.productId;
      updateQty(productId, -1);
    });
  });
}

function updateQty(productId, change) {
  cart[productId].quantity += change;

  //basic check if last item na
  if (cart[productId].quantity <= 0) {
    delete cart[productId];
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function removeFromCart(productId) {
  if (confirm("Are you sure you want to remove this item?")) {
    delete cart[productId];
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
  }
}

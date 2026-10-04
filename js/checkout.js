// checkout.js — renders the order summary from the real cart and
// handles placing the order.

function renderOrderSummary() {
  const cart = getCart();
  const tbody = document.getElementById("order-items");

  if (cart.length === 0) {
    tbody.innerHTML = `<tr><td colspan="2">Your cart is empty.</td></tr>`;
    document.getElementById("order-subtotal").textContent = "Rs. 0";
    document.getElementById("order-total").textContent = "Rs. 0";
    return;
  }

  tbody.innerHTML = cart.map(item => `
    <tr>
      <td>${item.name} &times; ${item.qty}</td>
      <td>Rs. ${(item.price * item.qty).toLocaleString()}</td>
    </tr>
  `).join("");

  const subtotal = cartSubtotal();
  document.getElementById("order-subtotal").textContent = "Rs. " + subtotal.toLocaleString();
  document.getElementById("order-total").textContent = "Rs. " + subtotal.toLocaleString();
}

function placeOrder(e) {
  e.preventDefault();

  const required = document.querySelectorAll(".billing [required]");
  for (const field of required) {
    if (!field.value.trim()) {
      field.focus();
      alert("Please fill in all required fields marked with *.");
      return;
    }
  }

  if (getCart().length === 0) {
    alert("Your cart is empty — add a product before checking out.");
    return;
  }

  alert("Thank you! Your order has been placed.");
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
  window.location.href = "homepage.html";
}

document.addEventListener("DOMContentLoaded", () => {
  renderOrderSummary();
  document.getElementById("place-order-btn").addEventListener("click", placeOrder);
});
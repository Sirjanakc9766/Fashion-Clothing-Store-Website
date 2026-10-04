// cart.js — renders the cart entirely from what's stored in localStorage
// (via cart-store.js) and makes qty/remove/coupon actually work.

const VALID_COUPONS = { SAVE10: 0.10, WELCOME5: 0.05 };
let appliedDiscount = 0;

function renderCart() {
  const cart = getCart();
  const layout = document.getElementById("cart-layout");
  const empty = document.getElementById("cart-empty");
  const tbody = document.getElementById("cart-body");

  if (cart.length === 0) {
    layout.style.display = "none";
    empty.style.display = "block";
    return;
  }

  layout.style.display = "grid";
  empty.style.display = "none";

  tbody.innerHTML = cart.map((item, index) => `
    <tr>
      <td>
        <div class="cart-product">
          <img src="${item.image}" alt="${item.name}">
          <div>
            <h4>${item.name}</h4>
            <p>${[item.color, item.size].filter(Boolean).join(" / ")}</p>
          </div>
        </div>
      </td>
      <td>Rs. ${item.price.toLocaleString()}</td>
      <td class="qty-cell">
        <div class="quantity">
          <button type="button" onclick="changeQty(${index}, -1)">-</button>
          <input type="number" min="1" value="${item.qty}" onchange="setQty(${index}, this.value)">
          <button type="button" onclick="changeQty(${index}, 1)">+</button>
        </div>
      </td>
      <td>Rs. ${(item.price * item.qty).toLocaleString()}</td>
      <td><button class="remove-btn" onclick="removeItem(${index})"><i class="fa-solid fa-trash"></i></button></td>
    </tr>
  `).join("");

  updateTotals();
}

function updateTotals() {
  const subtotal = cartSubtotal();
  const discount = subtotal * appliedDiscount;
  const total = subtotal - discount;

  document.getElementById("subtotal").textContent = "Rs. " + subtotal.toLocaleString();
  document.getElementById("total").textContent = "Rs. " + Math.round(total).toLocaleString();

  const discountRow = document.getElementById("discount-row");
  if (appliedDiscount > 0) {
    discountRow.style.display = "flex";
    document.getElementById("discount").textContent = "- Rs. " + Math.round(discount).toLocaleString();
  } else {
    discountRow.style.display = "none";
  }
}

function changeQty(index, delta) {
  const cart = getCart();
  updateCartQty(index, cart[index].qty + delta);
  renderCart();
}

function setQty(index, value) {
  updateCartQty(index, parseInt(value, 10) || 1);
  renderCart();
}

function removeItem(index) {
  removeFromCart(index);
  renderCart();
}

function applyCoupon() {
  const input = document.getElementById("coupon-input");
  const message = document.getElementById("coupon-message");
  const code = input.value.trim().toUpperCase();

  if (VALID_COUPONS[code]) {
    appliedDiscount = VALID_COUPONS[code];
    message.textContent = `Coupon applied — ${appliedDiscount * 100}% off!`;
    message.style.color = "#1a8a3d";
  } else {
    appliedDiscount = 0;
    message.textContent = "Invalid coupon code.";
    message.style.color = "#c8102e";
  }

  updateTotals();
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  document.getElementById("apply-coupon-btn").addEventListener("click", applyCoupon);
});
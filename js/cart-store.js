// cart-store.js — shared localStorage-based cart used by product, cart,
// checkout pages and the header cart badge.
// Cart is an array of: { id, name, image, price, color, size, qty }

const CART_KEY = "fashionStationCart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(item) {
  const cart = getCart();

  const existing = cart.find(
    p => p.id === item.id && p.color === item.color && p.size === item.size
  );

  if (existing) {
    existing.qty += item.qty;
  } else {
    cart.push(item);
  }

  saveCart(cart);
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

function updateCartQty(index, qty) {
  const cart = getCart();
  if (cart[index]) {
    cart[index].qty = Math.max(1, qty);
    saveCart(cart);
  }
}

function cartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function cartSubtotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
}

function updateCartBadge() {
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = cartCount();
}

document.addEventListener("DOMContentLoaded", updateCartBadge);
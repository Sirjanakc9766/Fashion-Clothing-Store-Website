// product.js
// Reads ?id= from the URL, fills the template with that product's data,
// and wires up quantity, add-to-cart, and wishlist so they actually work.

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

document.title = product.name + " | Fashion Station";

document.getElementById("crumb-category").textContent = product.category;
document.getElementById("crumb-category").href = "homepage.html";
document.getElementById("crumb-name").textContent = product.name;

document.getElementById("p-image").src = product.image;
document.getElementById("p-image").alt = product.name;
document.getElementById("p-name").textContent = product.name;
document.getElementById("p-price").textContent = "Rs. " + product.price.toLocaleString();
document.getElementById("p-desc").textContent = product.description;
document.getElementById("p-code").textContent = product.code;
document.getElementById("p-category").textContent = product.category + " Collection";

document.getElementById("p-color").innerHTML =
  product.colors.map(c => `<option>${c}</option>`).join("");

document.getElementById("p-size").innerHTML =
  product.sizes.map(s => `<option>${s}</option>`).join("");

document.getElementById("p-features").innerHTML =
  product.features.map(f => `<li>${f}</li>`).join("");

// ---------- Quantity stepper ----------
const qtyInput = document.getElementById("p-qty");

document.getElementById("qty-minus").addEventListener("click", () => {
  qtyInput.value = Math.max(1, parseInt(qtyInput.value || "1", 10) - 1);
});

document.getElementById("qty-plus").addEventListener("click", () => {
  qtyInput.value = parseInt(qtyInput.value || "1", 10) + 1;
});

qtyInput.addEventListener("change", () => {
  qtyInput.value = Math.max(1, parseInt(qtyInput.value || "1", 10));
});

// ---------- Add to Cart ----------
document.getElementById("add-to-cart-btn").addEventListener("click", () => {
  const color = document.getElementById("p-color").value;
  const size = document.getElementById("p-size").value;
  const qty = Math.max(1, parseInt(qtyInput.value || "1", 10));

  addToCart({
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
    color: color,
    size: size,
    qty: qty
  });

  showToast(`${product.name} added to cart`);
});

// ---------- Wishlist ----------
const WISHLIST_KEY = "fashionStationWishlist";

function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function isWishlisted(productId) {
  return getWishlist().includes(productId);
}

function toggleWishlist(productId) {
  let list = getWishlist();
  if (list.includes(productId)) {
    list = list.filter(id => id !== productId);
  } else {
    list.push(productId);
  }
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
  return list.includes(productId);
}

const wishlistBtn = document.getElementById("wishlist-btn");
const wishlistIcon = wishlistBtn.querySelector("i");

function paintWishlistButton(active) {
  wishlistIcon.classList.toggle("fa-regular", !active);
  wishlistIcon.classList.toggle("fa-solid", active);
  wishlistBtn.classList.toggle("active", active);
  wishlistBtn.lastChild.textContent = active ? " Added to Wishlist" : " Add to Wishlist";
}

paintWishlistButton(isWishlisted(product.id));

wishlistBtn.addEventListener("click", () => {
  const active = toggleWishlist(product.id);
  paintWishlistButton(active);
  showToast(active ? "Added to wishlist" : "Removed from wishlist");
});

// ---------- Toast ----------
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 2200);
}
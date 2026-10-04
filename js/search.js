// search.js
// Toggles the header search box. If product cards are on the current page,
// it filters them live. Otherwise it sends the query to the homepage.

function toggleSearch() {
  document.getElementById("search-box").classList.toggle("active");
  document.getElementById("search-input").focus();
}

function filterProducts(query) {
  const filter = query.toLowerCase();
  document.querySelectorAll(".product-card").forEach(card => {
    const name = card.dataset.name.toLowerCase();
    card.style.display = name.includes(filter) ? "" : "none";
  });
}

function submitSearch(event) {
  event.preventDefault();
  const value = document.getElementById("search-input").value.trim();

  if (document.querySelector(".product-card")) {
    filterProducts(value);
  } else {
    window.location.href = "homepage.html?search=" + encodeURIComponent(value);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("search-input");
  if (!input) return;

  // Live filter as the person types (only matters where product cards exist)
  input.addEventListener("input", () => {
    if (document.querySelector(".product-card")) filterProducts(input.value);
  });

  // If we arrived here from a search on another page, run it automatically
  const params = new URLSearchParams(window.location.search);
  const query = params.get("search");
  if (query && document.querySelector(".product-card")) {
    input.value = query;
    document.getElementById("search-box").classList.add("active");
    filterProducts(query);
  }
});
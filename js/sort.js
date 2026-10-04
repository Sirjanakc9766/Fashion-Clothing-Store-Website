// sort.js — sorts the product cards already in the page by price.
// Works directly on the DOM (data-price attribute) so it needs no
// separate data source.

let originalOrder = [];

function captureOriginalOrder() {
  document.querySelectorAll(".products").forEach(grid => {
    originalOrder.push(Array.from(grid.children));
  });
}

function sortProducts() {
  const value = document.getElementById("sort").value;
  const grids = document.querySelectorAll(".products");

  grids.forEach((grid, i) => {
    let cards;
    if (value === "Sort by price: low to high") {
      cards = Array.from(grid.children).sort(
        (a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price)
      );
    } else if (value === "Sort by price: high to low") {
      cards = Array.from(grid.children).sort(
        (a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price)
      );
    } else {
      // "Sort by Latest" / "Sort by most Popularity" — restore original order
      cards = originalOrder[i];
    }
    cards.forEach(card => grid.appendChild(card));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  captureOriginalOrder();
  const sortSelect = document.getElementById("sort");
  if (sortSelect) sortSelect.addEventListener("change", sortProducts);
});
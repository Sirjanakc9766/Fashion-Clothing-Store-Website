// store.js — powers the Find a Store page: search, grid/detail views,
// and a Google Maps embed for each store. Adapted from the original
// store finder, restyled to match the rest of the site.

const STORES = [
  { slug: "baneshwor",   name: "Baneshwor",   phones: ["01-4783006", "9861239269"], address: "Madan Bhandari Road, Baneshwor", categories: "Men, Women, Shoes, Bags" },
  { slug: "bhaktapur",   name: "Bhaktapur",   phones: ["01-6619982", "9843347783"], address: "Suryabinayak, Ramdevi Complex", categories: "Men, Women, Kids, Shoes, Bags" },
  { slug: "city-center", name: "City Center", phones: ["01-4011538", "9840027707"], address: "3F, Kamal Pokhari, Kathmandu", categories: "Men, Women, Kids, Shoes, Bags" },
  { slug: "civil-mall",  name: "Civil Mall",  phones: ["9761794142"],               address: "3F, Sundhara, Kathmandu", categories: "Men, Women, Kids, Shoes, Bags" },
  { slug: "jhamsikhel",  name: "Jhamsikhel",  phones: ["9840027704"],               address: "Jhamsikhel, Lalitpur", categories: "Men, Women, Bags" },
  { slug: "kumaripati",  name: "Kumaripati",  phones: ["01-5524627", "9840027701"], address: "Kumaripati, Patan", categories: "Men, Women, Kids, Shoes, Bags" },
  { slug: "maharajgunj", name: "Maharajgunj", phones: ["01-4721221", "9840027706"], address: "Maharajgunj Road", categories: "Men, Women, Kids, Shoes, Bags" },
  { slug: "pokhara",     name: "Pokhara",     phones: ["061-573948"],               address: "Chipledhunga, Pokhara", categories: "Men, Women, Kids, Shoes, Bags" },
  { slug: "sitapaila",   name: "Sitapaila",   phones: ["9840027708"],               address: "Tri-Ratna Tamrakar Complex", categories: "Men, Women, Kids, Shoes, Bags" }
];

const gridView = document.getElementById("view-grid");
const detailView = document.getElementById("view-detail");

function renderGrid(list) {
  const grid = document.getElementById("store-grid");
  const noResults = document.getElementById("no-results");

  if (list.length === 0) {
    grid.innerHTML = "";
    noResults.style.display = "block";
    return;
  }
  noResults.style.display = "none";

  grid.innerHTML = list.map(s => `
    <article class="store-card" data-slug="${s.slug}">
      <h2>${s.name}</h2>
      <p class="phone">${s.phones.map(p => `<a href="tel:${p.replace(/[^0-9+]/g, "")}">${p}</a>`).join(", ")}</p>
      <p class="address">${s.address}</p>
      <p class="categories">${s.categories}</p>
      <div class="spacer"></div>
      <a class="map-link" href="#store=${s.slug}">View location &rarr;</a>
    </article>
  `).join("");

  grid.querySelectorAll(".store-card").forEach(card => {
    card.addEventListener("click", () => {
      window.location.hash = `store=${card.dataset.slug}`;
    });
  });
}

function renderDetail(slug) {
  const store = STORES.find(s => s.slug === slug);
  if (!store) {
    window.location.hash = "";
    return;
  }

  document.getElementById("d-name").textContent = store.name;
  document.getElementById("d-address").textContent = store.address;
  document.getElementById("d-phone").innerHTML = store.phones
    .map(p => `<a href="tel:${p.replace(/[^0-9+]/g, "")}">${p}</a>`)
    .join("");
  document.getElementById("d-categories").textContent = store.categories;

  const query = encodeURIComponent(`${store.name} ${store.address}`);
  document.getElementById("d-map").src = `https://maps.google.com/maps?q=${query}&output=embed`;
}

function route() {
  const hash = window.location.hash;
  const match = hash.match(/store=([\w-]+)/);

  if (match) {
    renderDetail(match[1]);
    gridView.classList.remove("active");
    detailView.classList.add("active");
    window.scrollTo(0, 0);
  } else {
    gridView.classList.add("active");
    detailView.classList.remove("active");
  }
}

document.getElementById("store-search").addEventListener("input", e => {
  const q = e.target.value.trim().toLowerCase();
  renderGrid(STORES.filter(s =>
    s.name.toLowerCase().includes(q) || s.address.toLowerCase().includes(q)
  ));
});

document.getElementById("back-link").addEventListener("click", e => {
  e.preventDefault();
  window.location.hash = "";
});

window.addEventListener("hashchange", route);

renderGrid(STORES);
route();
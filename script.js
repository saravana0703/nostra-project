const mobileMenuButton = document.querySelector(".mobile-menu-button");
const mobileMenu = document.querySelector(".mobile-menu");

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
}

const products = [
    {
        name: "Linen Weekend Shirt",
        price: "$39",
        image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=700&q=80",
        tags: ["casual", "white", "new"],
        description: "Breathable linen shirt for warm days."
    },
    {
        name: "Black Evening Dress",
        price: "$68",
        image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=700&q=80",
        tags: ["party", "black", "sale"],
        description: "Elegant dress with a clean evening silhouette."
    },
    {
        name: "Green Utility Jacket",
        price: "$74",
        image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=700&q=80",
        tags: ["casual", "green", "new"],
        description: "Layer-ready jacket with roomy pockets."
    },
    {
        name: "Blue Denim Overshirt",
        price: "$52",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=700&q=80",
        tags: ["casual", "blue", "sale"],
        description: "Relaxed denim overshirt for daily wear."
    },
    {
        name: "Tailored Formal Blazer",
        price: "$89",
        image: "https://images.unsplash.com/photo-1506629905607-d405d7d3b0d2?auto=format&fit=crop&w=700&q=80",
        tags: ["formal", "black", "new"],
        description: "Sharp blazer for office and events."
    },
    {
        name: "White Pleated Skirt",
        price: "$45",
        image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d77?auto=format&fit=crop&w=700&q=80",
        tags: ["party", "white", "new"],
        description: "Soft pleated skirt with easy movement."
    },
    {
        name: "Blue Oxford Shirt",
        price: "$48",
        image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=700&q=80",
        tags: ["formal", "blue", "sale"],
        description: "Crisp cotton shirt for polished outfits."
    },
    {
        name: "Green Satin Top",
        price: "$42",
        image: "https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&w=700&q=80",
        tags: ["party", "green", "sale"],
        description: "Glossy satin top for evening styling."
    },
    {
        name: "Black Casual Hoodie",
        price: "$58",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=80",
        tags: ["casual", "black", "new"],
        description: "Comfort hoodie with a soft fleece finish."
    }
];

const productGrid = document.querySelector("#productGrid");
const searchInput = document.querySelector("#searchInput");
const filterCheckboxes = document.querySelectorAll(".filter-checkbox");
const clearFiltersButton = document.querySelector("#clearFilters");
const resultCount = document.querySelector("#resultCount");
const emptyMessage = document.querySelector("#emptyMessage");

function createProductCard(product) {
    const tags = product.tags.map((tag) => `<span>${tag}</span>`).join("");

    return `
        <article class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-card-content">
                <div class="flex items-start justify-between gap-3">
                    <h3>${product.name}</h3>
                    <p class="font-black text-slate-950">${product.price}</p>
                </div>
                <p>${product.description}</p>
                <div class="product-tags">${tags}</div>
            </div>
        </article>
    `;
}

function getSelectedFilters() {
    return Array.from(filterCheckboxes)
        .filter((checkbox) => checkbox.checked)
        .reduce((groups, checkbox) => {
            const groupName = checkbox.dataset.group;
            groups[groupName] = groups[groupName] || [];
            groups[groupName].push(checkbox.value);
            return groups;
        }, {});
}

function renderProducts() {
    if (!productGrid) return;

    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedFilters = getSelectedFilters();

    // Product must match search text and at least one selected option in each active filter group.
    const filteredProducts = products.filter((product) => {
        const productText = `${product.name} ${product.description} ${product.tags.join(" ")}`.toLowerCase();
        const matchesSearch = productText.includes(searchTerm);
        const matchesFilters = Object.values(selectedFilters).every((filters) => {
            return filters.some((filter) => product.tags.includes(filter));
        });

        return matchesSearch && matchesFilters;
    });

    productGrid.innerHTML = filteredProducts.map(createProductCard).join("");

    if (resultCount) {
        resultCount.textContent = `${filteredProducts.length} product${filteredProducts.length === 1 ? "" : "s"} found`;
    }

    if (emptyMessage) {
        emptyMessage.classList.toggle("hidden", filteredProducts.length > 0);
    }
}

if (productGrid) {
    renderProducts();
    searchInput.addEventListener("input", renderProducts);
    filterCheckboxes.forEach((checkbox) => checkbox.addEventListener("change", renderProducts));
    clearFiltersButton.addEventListener("click", () => {
        searchInput.value = "";
        filterCheckboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
        renderProducts();
    });
}

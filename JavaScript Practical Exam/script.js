const form = document.getElementById('product-form');
const productList = document.getElementById('product-list');
const searchInput = document.getElementById('search');
const sortSelect = document.getElementById('sort');
const filterInput = document.getElementById('filter');

let products = JSON.parse(localStorage.getItem('products')) || [];
let editingIndex = null;

form.addEventListener('submit', function (forms) {
    forms.preventDefault();

    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const image = document.getElementById('image').value;
    const category = document.getElementById('category').value;

    if (!title || !price || !image || !category) {
        alert('All fields are required!');
        return;
    }

    const product = { title, price: parseFloat(price), image, category };

    if (editingIndex !== null) {
        products[editingIndex] = product;
        editingIndex = null;
    } else {
        products.push(product);
    }

    saveAndDisplay();
    form.reset();
});
function saveAndDisplay() {
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts(products);
}
function displayProducts(list) {
    productList.innerHTML = '';

    list.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
     <img src="${product.image}" alt="${product.title}" />
     <h3>${product.title}</h3>
     <p>₹${product.price}</p>
     <p>${product.category}</p>
     <button class="edit-btn" onclick="editProduct(${index})">Edit</button>
    <button class="delete-btn" onclick="deleteProduct(${index})">Delete</button>
 `;
        productList.appendChild(card);
    });
}
function editProduct(index) {
    const product = products[index];
    document.getElementById('title').value = product.title;
    document.getElementById('price').value = product.price;
    document.getElementById('image').value = product.image;
    document.getElementById('category').value = product.category;
    editingIndex = index;
}
function deleteProduct(index) {
    if (confirm('Are you sure you want to delete this product?')) {
        products.splice(index, 1);
        saveAndDisplay();
    }
}
searchInput.addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();
    const filtered = products.filter(product => product.title.toLowerCase().includes(searchValue));
    displayProducts(filtered);
});
sortSelect.addEventListener('change', function () {
    let sorted = [...products];
    if (this.value === 'low-to-high') {
        sorted.sort((a, b) => a.price - b.price);
    } else if (this.value === 'high-to-low') {
        sorted.sort((a, b) => b.price - a.price);
    }
    displayProducts(sorted);
});

saveAndDisplay();
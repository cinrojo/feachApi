document.addEventListener('DOMContentLoaded', () => {
    fetchCategories(); // Llama a la función fetchCategories para obtener las categorías de productos
    loadCartFromLocalStorage(); // Carga el carrito desde localStorage al iniciar la página
    updateCartCount(); // Llama a la función updateCartCount para actualizar el conteo del carrito de compras
});

async function fetchCategories() {
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories'); // Realiza una solicitud a la API para obtener las categorías
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`); // Si la respuesta no es exitosa, lanza un error
        const categories = await response.json(); // Convierte la respuesta en JSON
        displayCategories(categories); // Llama a la función displayCategories para mostrar las categorías en la página
    } catch (error) {
        console.error('Error fetching categories:', error); // Captura y muestra errores en la consola
    }
}

function displayCategories(categories) {
    const categoriesList = document.getElementById('categories'); // Obtiene el elemento HTML donde se mostrarán las categorías
    categoriesList.innerHTML = ''; // Limpia el contenido actual de categoriesList
    categories.forEach(category => { // Itera sobre cada categoría
        const li = document.createElement('li'); // Crea un nuevo elemento li
        li.className = 'nav-item'; // Asigna una clase al elemento li
        const a = document.createElement('a'); // Crea un nuevo elemento a
        a.href = 'javascript:void(0);'; // Asigna un enlace que no realiza ninguna acción
        a.textContent = category; // Establece el texto del enlace como el nombre de la categoría
        a.className = 'nav-link'; // Asigna una clase al enlace
        a.addEventListener('click', () => fetchProductsByCategory(category)); // Añade un evento de clic para obtener productos de la categoría
        li.appendChild(a); // Añade el enlace al elemento li
        categoriesList.appendChild(li); // Añade el elemento li al categoriesList
    });
}

async function fetchProductsByCategory(category) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${category}`); // Realiza una solicitud a la API para obtener productos de una categoría específica
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`); // Si la respuesta no es exitosa, lanza un error
        const products = await response.json(); // Convierte la respuesta en JSON
        displayProducts(products); // Llama a la función displayProducts para mostrar los productos en la página
    } catch (error) {
        console.error(`Error fetching products for category ${category}:`, error); // Captura y muestra errores en la consola
    }
}

function displayProducts(products) {
    const productsDiv = document.getElementById('products'); // Obtiene el elemento HTML donde se mostrarán los productos
    productsDiv.innerHTML = ''; // Limpia el contenido actual de productsDiv
    products.forEach(product => { // Itera sobre cada producto
        const productCard = document.createElement('div'); // Crea un nuevo elemento div para la tarjeta del producto
        productCard.className = 'col-md-4 mb-4'; // Asigna clases al elemento div
        productCard.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">$${product.price}</p>
                    <button class="btn btn-primary" onclick="displayProductDetails(${product.id})">Ver Detalles</button>
                    <button class="btn btn-success" onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')">Agregar al Carrito</button>
                </div>
            </div>
        `; // Establece el contenido HTML de la tarjeta del producto, incluyendo los botones de "Ver Detalles" y "Agregar al Carrito"
        productsDiv.appendChild(productCard); // Añade la tarjeta del producto al productsDiv
    });
}

async function displayProductDetails(productId) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`); // Realiza una solicitud a la API para obtener los detalles del producto específico
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`); // Si la respuesta no es exitosa, lanza un error
        const product = await response.json(); // Convierte la respuesta en JSON
        const productDetailsDiv = document.getElementById('product-details'); // Obtiene el elemento HTML donde se mostrarán los detalles del producto
        document.getElementById('product-details-title').style.display = 'block'; // Muestra el título de los detalles del producto
        productDetailsDiv.style.display = 'block'; // Muestra la sección de detalles del producto
        productDetailsDiv.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top product-detail-img" alt="${product.title}">
                <div class="card-body">
                    <h2 class="card-title">${product.title}</h2>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">Precio: $${product.price}</p>
                    <div class="quantity-buttons mt-3">
                
                    <button class="btn btn-success mt-3" onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')">Agregar al Carrito</button>
                </div>
            </div>
        `; // Establece el contenido HTML de los detalles del producto, incluyendo los botones de incremento y decremento
        document.getElementById('product-details-title').scrollIntoView({ behavior: 'smooth' }); // Desplaza la vista para mostrar los detalles del producto
    } catch (error) {
        console.error('Error fetching product details:', error); // Captura y muestra errores en la consola
    }
}

function incrementQuantity() {
    const productQuantity = document.getElementById('product-quantity');
    let quantity = parseInt(productQuantity.textContent);
    quantity += 1;
    productQuantity.textContent = quantity;
}

function decrementQuantity() {
    const productQuantity = document.getElementById('product-quantity');
    let quantity = parseInt(productQuantity.textContent);
    if (quantity > 1) {
        quantity -= 1;
        productQuantity.textContent = quantity;
    }
}

let cart = loadCartFromLocalStorage(); // Carga el carrito desde localStorage

function addToCart(id, title, price, image) {
    const existingItem = cart.find(item => item.id === id); // Busca si el producto ya está en el carrito
    if (existingItem) {
        existingItem.quantity += 1; // Si el producto ya está en el carrito, incrementa su cantidad
    } else {
        cart.push({ id, title, price, image, quantity: 1 }); // Si el producto no está en el carrito, lo añade con cantidad 1
    }
    saveCartToLocalStorage(); // Guarda el carrito en localStorage
    displayCart(); // Actualiza la visualización del carrito
    updateCartCount(); // Actualiza el conteo del carrito
}

function displayCart() {
    const cartItems = document.getElementById('cart-items'); // Obtiene el elemento HTML donde se mostrarán los elementos del carrito
    const totalPrice = document.getElementById('total-price'); // Obtiene el elemento HTML donde se mostrará el precio total
    cartItems.innerHTML = ''; // Limpia el contenido actual de cartItems
    let total = 0; // Inicializa la variable para el total del precio
    cart.forEach(item => { // Itera sobre cada elemento en el carrito
        const li = document.createElement('li'); // Crea un nuevo elemento li
        li.className = 'list-group-item d-flex justify-content-between align-items-center'; // Asigna clases al elemento li
        li.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-item-img">
            ${item.title} - $${item.price} x ${item.quantity}
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Eliminar</button>
        `; // Establece el contenido HTML del elemento li
        cartItems.appendChild(li); // Añade el elemento li a cartItems
        total += item.price * item.quantity; // Calcula el total del precio
    });
    totalPrice.textContent = total.toFixed(2); // Muestra el precio total con dos decimales
}

function removeFromCart(id) {
    const itemIndex = cart.findIndex(item => item.id === id); // Encuentra el índice del elemento en el carrito
    if (itemIndex > -1) {
        cart[itemIndex].quantity -= 1; // Decrementa la cantidad del producto
        if (cart[itemIndex].quantity === 0) {
            cart.splice(itemIndex, 1); // Si la cantidad es 0, elimina el producto del carrito
        }
        saveCartToLocalStorage(); // Guarda el carrito en localStorage
        displayCart(); // Actualiza la visualización del carrito
        updateCartCount(); // Actualiza el conteo del carrito
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count'); // Obtiene el elemento HTML donde se mostrará el conteo del carrito
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0); // Calcula el total de elementos en el carrito
    cartCount.textContent = totalItems; // Muestra el total de elementos en el carrito
}

function showCart() {
    $('#cartModal').modal('show'); // Muestra el modal del carrito usando jQuery
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart)); // Guarda el carrito en localStorage
}

function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart'); // Obtiene el carrito desde localStorage
    return storedCart ? JSON.parse(storedCart) : []; // Si hay un carrito guardado, lo convierte en un objeto, de lo contrario, retorna un arreglo vacío
}

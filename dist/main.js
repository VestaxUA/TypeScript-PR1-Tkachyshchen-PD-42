import { findProduct } from './productFunctions';
import { addToCart, calculateTotal } from './cartFunctions';
const electronics = [
    { id: 1, name: "Телефон", price: 10000, category: 'electronics', warrantyPeriod: 24 }
];
const clothing = [
    { id: 2, name: "Футболка", price: 500, category: 'clothing', size: 'M', material: 'Cotton' }
];
let cart = [];
function displayProducts() {
    const productList = document.getElementById("product-list");
    electronics.forEach(product => {
        const productElement = document.createElement("div");
        productElement.innerHTML = `
      <h3>${product.name}</h3>
      <p>Ціна: ${product.price} грн</p>
      <button onclick="addToCartHandler(${product.id}, 'electronics')">Додати до кошика</button>
    `;
        productList?.appendChild(productElement);
    });
    clothing.forEach(product => {
        const productElement = document.createElement("div");
        productElement.innerHTML = `
      <h3>${product.name}</h3>
      <p>Ціна: ${product.price} грн</p>
      <button onclick="addToCartHandler(${product.id}, 'clothing')">Додати до кошика</button>
    `;
        productList?.appendChild(productElement);
    });
}
function addToCartHandler(id, category) {
    let product;
    if (category === 'electronics') {
        product = findProduct(electronics, id);
    }
    else if (category === 'clothing') {
        product = findProduct(clothing, id);
    }
    if (product) {
        cart = addToCart(cart, product, 1);
        updateCartDisplay();
    }
}
function updateCartDisplay() {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    cartItems.innerHTML = "";
    cart.forEach(item => {
        const itemElement = document.createElement("li");
        itemElement.innerText = `${item.product.name} x ${item.quantity}`;
        cartItems.appendChild(itemElement);
    });
    totalPrice.innerText = `Загальна вартість: ${calculateTotal(cart)} грн`;
}
displayProducts();
window.addToCartHandler = addToCartHandler;
window.updateCartDisplay = updateCartDisplay;

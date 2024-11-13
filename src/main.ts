// Імпортуємо типи та функції з інших модулів
import { Electronics, Clothing, CartItem, BaseProduct } from './types';
import { findProduct, filterByPrice } from './productFunctions';
import { addToCart, calculateTotal } from './cartFunctions';

// Створення тестових даних для товарів електроніки та одягу
const electronics: Electronics[] = [
  { id: 1, name: "Телефон", price: 10000, category: 'electronics', warrantyPeriod: 24 }
];

const clothing: Clothing[] = [
  { id: 2, name: "Футболка", price: 500, category: 'clothing', size: 'M', material: 'Cotton' }
];

// Ініціалізація порожнього кошика
let cart: CartItem<BaseProduct>[] = [];

/**
 * Функція для відображення списку товарів на веб-сторінці
 * Вона створює елементи DOM для кожного товару та додає кнопки "Додати до кошика"
 */
function displayProducts() {
  const productList = document.getElementById("product-list");

  // Відображення товарів електроніки
  electronics.forEach(product => {
    const productElement = document.createElement("div");
    productElement.innerHTML = `
      <h3>${product.name}</h3>
      <p>Ціна: ${product.price} грн</p>
      <button onclick="addToCartHandler(${product.id}, 'electronics')">Додати до кошика</button>
    `;
    productList?.appendChild(productElement);
  });

  // Відображення товарів одягу
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

/**
 * Функція обробки натискання кнопки "Додати до кошика"
 * @param id - ID товару, який додається в кошик
 * @param category - категорія товару ('electronics' або 'clothing')
 */
function addToCartHandler(id: number, category: string) {
  let product: BaseProduct | undefined;

  // Знаходимо товар в залежності від категорії
  if (category === 'electronics') {
    product = findProduct(electronics, id);
  } else if (category === 'clothing') {
    product = findProduct(clothing, id);
  }

  // Якщо товар знайдений, додаємо його в кошик
  if (product) {
    cart = addToCart(cart, product, 1);
    updateCartDisplay(); // Оновлюємо відображення кошика
  }
}

/**
 * Функція для оновлення відображення кошика на сторінці
 * Вона показує список товарів у кошику та загальну вартість
 */
function updateCartDisplay() {
  const cartItems = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");

  // Очищаємо список товарів у кошику перед оновленням
  cartItems!.innerHTML = "";
  cart.forEach(item => {
    const itemElement = document.createElement("li");
    itemElement.innerText = `${item.product.name} x ${item.quantity}`;
    cartItems!.appendChild(itemElement);
  });

  // Оновлюємо відображення загальної вартості кошика
  totalPrice!.innerText = `Загальна вартість: ${calculateTotal(cart)} грн`;
}

// Викликаємо функцію для відображення товарів на сторінці
displayProducts();

// Додаємо функції для доступу з глобального об'єкта window
(window as any).addToCartHandler = addToCartHandler;
(window as any).updateCartDisplay = updateCartDisplay;

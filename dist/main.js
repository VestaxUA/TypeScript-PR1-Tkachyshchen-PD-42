import { findProduct } from './productFunctions';
import { addToCart, calculateTotal } from './cartFunctions';
const electronics = [
    { id: 1, name: "Телефон", price: 10000, category: 'electronics', warrantyPeriod: 24 }
];
const clothing = [
    { id: 2, name: "Футболка", price: 500, category: 'clothing', size: 'M', material: 'Cotton' }
];
const phone = findProduct(electronics, 1);
let cart = [];
if (phone) {
    cart = addToCart(cart, phone, 1);
}
const tShirt = findProduct(clothing, 2);
if (tShirt) {
    cart = addToCart(cart, tShirt, 2);
}
const total = calculateTotal(cart);
console.log(`Загальна вартість кошика: ${total}`);

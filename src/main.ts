import { Electronics, Clothing, CartItem, BaseProduct } from './types';
import { findProduct, filterByPrice } from './productFunctions';
import { addToCart, calculateTotal } from './cartFunctions';

const electronics: Electronics[] = [
  { id: 1, name: "Телефон", price: 10000, category: 'electronics', warrantyPeriod: 24 }
];

const clothing: Clothing[] = [
  { id: 2, name: "Футболка", price: 500, category: 'clothing', size: 'M', material: 'Cotton' }
];

const phone = findProduct(electronics, 1);

let cart: CartItem<BaseProduct>[] = [];
if (phone) {
  cart = addToCart(cart, phone, 1);
}

const tShirt = findProduct(clothing, 2);
if (tShirt) {
  cart = addToCart(cart, tShirt, 2);
}

const total = calculateTotal(cart);
console.log(`Загальна вартість кошика: ${total}`);

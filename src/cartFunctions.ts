// Імпортуємо типи BaseProduct і CartItem для використання в функціях
import { BaseProduct, CartItem } from './types';

/**
 * Функція для додавання товару до кошика.
 * Якщо товар вже є в кошику, збільшується його кількість; якщо товару немає, додається новий елемент.
 * Використовує генерик для підтримки різних типів товарів.
 * @param cart - поточний масив товарів у кошику
 * @param product - товар, який додається до кошика
 * @param quantity - кількість товару, яку потрібно додати
 * @returns - оновлений масив кошика
 */
export const addToCart = <T extends BaseProduct>(
  cart: CartItem<T>[], // масив товарів у кошику
  product: T, // товар, який додається
  quantity: number // кількість товару
): CartItem<T>[] => {
  // Знаходимо товар у кошику
  const existingItemIndex = cart.findIndex(item => item.product.id === product.id);
  
  // Якщо товар уже є в кошику, збільшуємо кількість
  if (existingItemIndex >= 0 && cart[existingItemIndex]) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Якщо товару ще немає в кошику, додаємо новий
    cart.push({ product, quantity });
  }

  // Повертаємо оновлений кошик
  return cart;
};

/**
 * Функція для підрахунку загальної вартості всіх товарів у кошику.
 * Вираховує суму, помноживши ціну кожного товару на його кількість.
 * @param cart - масив товарів у кошику
 * @returns - загальна вартість кошика
 */
export const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
  // Використовуємо метод reduce для підсумовування вартості
  return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
};
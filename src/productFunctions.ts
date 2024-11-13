// Імпортуємо тип BaseProduct, який використовується для всіх продуктів
import { BaseProduct } from './types';

/**
 * Функція для пошуку продукту за ID серед масиву товарів.
 * Використовує генерик, щоб бути універсальною для будь-якого типу продуктів, що наслідують BaseProduct.
 * @param products - масив товарів, серед яких шукаємо
 * @param id - ID товару, який шукаємо
 * @returns - знайдений товар або undefined, якщо товар з таким ID не знайдений
 */
export const findProduct = <T extends BaseProduct>(products: T[], id: number): T | undefined => {
  return products.find(product => product.id === id);
};

/**
 * Функція для фільтрації продуктів за ціною.
 * Повертає масив товарів, ціна яких не перевищує вказану максимальну ціну.
 * @param products - масив товарів, який фільтруємо
 * @param maxPrice - максимальна ціна, якої не повинні перевищувати товари
 * @returns - масив товарів, що відповідають умові
 */
export const filterByPrice = <T extends BaseProduct>(products: T[], maxPrice: number): T[] => {
  return products.filter(product => product.price <= maxPrice);
};
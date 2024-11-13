import { BaseProduct, CartItem } from './types';

export const addToCart = <T extends BaseProduct>(
  cart: CartItem<T>[],
  product: T,
  quantity: number
): CartItem<T>[] => {
  const existingItemIndex = cart.findIndex(item => item.product.id === product.id);
  if (existingItemIndex >= 0 && cart[existingItemIndex]) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
  return cart;
};

export const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
  return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
};

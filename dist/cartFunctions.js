export const addToCart = (cart, product, quantity) => {
    const existingItemIndex = cart.findIndex(item => item.product.id === product.id);
    if (existingItemIndex >= 0 && cart[existingItemIndex]) {
        cart[existingItemIndex].quantity += quantity;
    }
    else {
        cart.push({ product, quantity });
    }
    return cart;
};
export const calculateTotal = (cart) => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
};

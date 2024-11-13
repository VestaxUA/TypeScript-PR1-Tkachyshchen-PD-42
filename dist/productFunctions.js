export const findProduct = (products, id) => {
    return products.find(product => product.id === id);
};
export const filterByPrice = (products, maxPrice) => {
    return products.filter(product => product.price <= maxPrice);
};

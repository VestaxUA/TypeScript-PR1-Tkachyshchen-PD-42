type BaseProduct = {
    id: number;
    name: string;
    price: number;
    description: string;
  };
  
  type Electronics = BaseProduct & {
    category: 'electronics';
    brand: string;
    warrantyPeriod: number;
  };

  type Clothing = BaseProduct & {
    category: 'clothing';
    size: string;
    material: string;
    color: string;
  };
  
  type Book = BaseProduct & {
    category: 'books';
    author: string;
    pages: number;
    genre: string;
  };

const findProduct = <T extends BaseProduct>(products: T[], id: number): T | undefined => {
    return products.find(product => product.id === id);
  };
  
  const filterByPrice = <T extends BaseProduct>(products: T[], maxPrice: number): T[] => {
    return products.filter(product => product.price <= maxPrice);
  };

type CartItem<T> = {
    product: T;
    quantity: number;
  };
  
  const addToCart = <T extends BaseProduct>(
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
  
  const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

const electronics: Electronics[] = [
    {
      id: 1,
      name: "Телефон",
      price: 10000,
      description: "Сучасний смартфон з потужним процесором",
      category: 'electronics',
      brand: "TechBrand",
      warrantyPeriod: 24
    }
  ];
  
  const clothing: Clothing[] = [
    {
      id: 2,
      name: "Футболка",
      price: 500,
      description: "Зручна футболка з бавовни",
      category: 'clothing',
      size: "M",
      material: "cotton",
      color: "black"
    }
  ];
  
  const books: Book[] = [
    {
      id: 3,
      name: "Книга",
      price: 300,
      description: "Захоплюючий роман",
      category: 'books',
      author: "Автор Книги",
      pages: 250,
      genre: "Фантастика"
    }
  ];
  
  const phone = findProduct(electronics, 1);
  console.log("Знайдений товар:", phone);
  
  const affordableClothes = filterByPrice(clothing, 600);
  console.log("Доступний одяг за ціною до 600:", affordableClothes);

let cart: CartItem<BaseProduct>[] = [];

if (electronics[0]) {
  cart = addToCart(cart, electronics[0], 1); // Додаємо телефон у кошик
}

if (clothing[0]) {
  cart = addToCart(cart, clothing[0], 2); // Додаємо футболки у кошик
}

  const total = calculateTotal(cart);
  console.log("Загальна вартість кошика:", total);
  
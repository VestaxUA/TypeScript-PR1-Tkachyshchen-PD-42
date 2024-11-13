export type BaseProduct = {
    id: number;
    name: string;
    price: number;
  };

  export type Electronics = BaseProduct & {
    category: 'electronics';
    warrantyPeriod: number;
  };
  
  export type Clothing = BaseProduct & {
    category: 'clothing';
    size: string;
    material: string;
  };
  
  export type CartItem<T> = {
    product: T;
    quantity: number;
  };
  
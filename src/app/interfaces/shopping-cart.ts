export interface ShoppingCart {
  id: number;
  quantity: number;
  user_id: number;
  product_id: number;
  product: string;
  price: number;
  image: string;
}
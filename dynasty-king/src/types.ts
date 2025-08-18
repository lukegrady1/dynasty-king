export type Category =
  | 'Appetizers'
  | 'Dim Sum'
  | 'Noodles'
  | 'Rice'
  | 'Entrees'
  | 'Vegetables'
  | 'Desserts'
  | 'Beverages';

export interface Dish {
  name: string;
  price: number; // money as integer cents
  category: string; // optional if you only store name + price
}
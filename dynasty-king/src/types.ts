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
  id: string;
  name: string;
  priceCents: number; // money as integer cents
  category?: Category; // optional if you only store name + price
}
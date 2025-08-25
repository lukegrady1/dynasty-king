export type Category =
  "appetizers"
  "soups"
  "fried_rice"
  "lo_mein"
  "chow_fun_mei_fun"
  "chow_mein"
  "chop_suey"
  "egg_foo_young"
  "pork"
  "poultry"
  "beef"
  "seafood"
  "sweet_and_sour"
  "vegetarian_dishes"
  "house_combo"
  "chefs_specialties"
  "sides"

export interface Dish {
  name: string;
  price: number; // money as integer cents
  category: string; // optional if you only store name + price
}
export type Tabs = 'search' | 'favourites'

export type FavouritePayload = {
    recipeId: number;
    token: string;
};
export type CartItem = {
    recipeId: number;
    title: string;
    image: string;
    price: number;
    quantity: number;
    createdAt: Date;
    id: number;
    userId: number;
};
export type Recipe = {
  id: number;
  title: string;
  image: string;
  pricePerServing: number;
  servings: number;
};
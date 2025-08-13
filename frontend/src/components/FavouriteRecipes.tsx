import type IRecipes from "../interfaces";
import RecipeCard from "./RecipeCard";

interface FavouriteRecipesProps {
  favouriteRecipes: IRecipes[];
  onRemoveFavourite: (recipe: IRecipes) => Promise<void>;
}

export default function FavouriteRecipes({ favouriteRecipes, onRemoveFavourite }: FavouriteRecipesProps) {
  return (
    <div>
      {favouriteRecipes.map((recipe) => (
        <div key={recipe.id}>
          <RecipeCard
            recipe={recipe}
            onFavouriteButtonClick={onRemoveFavourite}
            isFavourite={true}
            onClick={() => {}}
          />
        </div>
      ))}
    </div>
  );
}

import { useState, type ChangeEvent, type FormEvent } from "react";
import type IRecipes from "../interfaces";
import RecipeCard from "./RecipeCard";

interface SearchRecipesProps {
  recipes: IRecipes[];
  favouriteRecipes: IRecipes[];
  onSearch: (searchTerm: string) => Promise<void>;
  onAddFavourite: (recipe: IRecipes) => Promise<void>;
  onRemoveFavourite: (recipe: IRecipes) => Promise<void>;
}

export default function SearchRecipes({
  recipes,
  favouriteRecipes,
  onSearch,
  onAddFavourite,
  onRemoveFavourite,
}: SearchRecipesProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSearch(searchTerm);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          placeholder="Enter the Search Term..."
          required
          value={searchTerm}
          onChange={onChangeHandler}
          className="border border-gray-300 px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-r-lg transition-colors duration-200"
        >
          Submit
        </button>
      </form>

      {recipes.map((recipe) => {
        const isFavourite = favouriteRecipes.some(
          (fav) => fav.id === recipe.id
        );
        return (
          <div key={recipe.id}>
            <RecipeCard
              recipe={recipe}
              onFavouriteButtonClick={
                isFavourite ? onRemoveFavourite : onAddFavourite
              }
              isFavourite={isFavourite}
              onClick={() => {}}
            />
          </div>
        );
      })}
    </>
  );
}

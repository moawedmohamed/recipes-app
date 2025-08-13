import  { useState,type ChangeEvent,type FormEvent } from "react";
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter the Search Term..."
          required
          value={searchTerm}
          onChange={onChangeHandler}
          className="border p-2 rounded"
        />
        <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>

      {recipes.map((recipe) => {
        const isFavourite = favouriteRecipes.some((fav) => fav.id === recipe.id);
        return (
          <div key={recipe.id}>
            <RecipeCard
              recipe={recipe}
              onFavouriteButtonClick={isFavourite ? onRemoveFavourite : onAddFavourite}
              isFavourite={isFavourite}
              onClick={() => {}}
            />
          </div>
        );
      })}
    </>
  );
}

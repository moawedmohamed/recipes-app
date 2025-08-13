import { useEffect, useRef, useState } from "react";
import * as api from "./api/api";
import type IRecipes from "./interfaces";
import RecipeModal from "./components/RecipeModal";
import Tabs from "./components/Tabs";
import SearchRecipes from "./components/SearchRecipes";
import FavouriteRecipes from "./components/FavouriteRecipes";
import ViewMoreButton from "./components/ui/ViewMoreButton";
import type { Tabs as TabType } from "./types";

function AppLogic() {
  const [recipes, setRecipes] = useState<IRecipes[]>([]);
  const [favouriteRecipes, setFavouriteRecipes] = useState<IRecipes[]>([]);
  const pageNumber = useRef<number>(1);
  const [selectedRecipe, setSelectedRecipe] = useState<IRecipes | undefined>(undefined);
  const [selectedTab, setSelectedTab] = useState<TabType>("search");

  useEffect(() => {
    async function fetchFavouriteRecipe() {
      try {
        const favouriteRecipe = await api.getFavouriteRecipes();
        setFavouriteRecipes(favouriteRecipe.results);
      } catch (error) {
        console.log(error);
      }
    }
    fetchFavouriteRecipe();
  }, []);

  const handleSearch = async (searchTerm: string) => {
    try {
      const recipes = await api.searchRecipes(searchTerm, 1);
      setRecipes(recipes?.results ?? []);
      pageNumber.current = 1; // reset page
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewMore = async () => {
    const nextPage = pageNumber.current + 1;
    try {
      const nextRecipe = await api.searchRecipes("", nextPage);
      setRecipes([...recipes, ...nextRecipe.results]);
      pageNumber.current = nextPage;
    } catch (error) {
      console.log(error);
    }
  };

  const addFavouriteRecipe = async (recipe: IRecipes) => {
    try {
      await api.addFavouriteRecipe(recipe);
      setFavouriteRecipes([...favouriteRecipes, recipe]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavouriteRecipe = async (recipe: IRecipes) => {
    try {
      await api.removeFavouriteRecipe(recipe);
      const updatedRecipe = favouriteRecipes.filter((fav) => fav.id !== recipe.id);
      setFavouriteRecipes(updatedRecipe);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Tabs selectedTab={selectedTab} onTabChange={setSelectedTab} />
      {selectedTab === "search" && (
        <SearchRecipes
          recipes={recipes}
          favouriteRecipes={favouriteRecipes}
          onSearch={handleSearch}
          onAddFavourite={addFavouriteRecipe}
          onRemoveFavourite={removeFavouriteRecipe}
        />
      )}
      {selectedTab === "favourites" && (
        <FavouriteRecipes
          favouriteRecipes={favouriteRecipes}
          onRemoveFavourite={removeFavouriteRecipe}
        />
      )}

      <ViewMoreButton onClick={handleViewMore} />

      {selectedRecipe && (
        <RecipeModal
          recipeId={selectedRecipe.id.toString()}
          onClose={() => setSelectedRecipe(undefined)}
        />
      )}
    </>
  );
}

export default AppLogic;

// AppLogic.tsx
import { useEffect, useRef, useState } from "react";
import * as api from "./api/api";
import type IRecipes from "./interfaces";

const userId = '2'; // لاحقًا يمكن استبداله بجلسة المستخدم

function AppLogic() {
  const [recipes, setRecipes] = useState<IRecipes[]>([]);
  const [defaultRecipes, setDefaultRecipes] = useState<IRecipes[]>([]);
  const [favouriteRecipes, setFavouriteRecipes] = useState<number[]>([]); // فقط IDs
  const pageNumber = useRef<number>(1);

  // جلب الوصفات الافتراضية أول مرة
  useEffect(() => {
    async function fetchDefaults() {
      try {
        const product = await api.getProducts();
        setDefaultRecipes(product.results);
      } catch (error) {
        console.log(error);
      }
    }
    fetchDefaults();
  }, []);

  // جلب المفضلات من DB 
  useEffect(() => {
    async function fetchFavouriteRecipe() {
      try {
        const favourites = await api.getFavouriteRecipes(userId);
        // حفظ IDs فقط لتسهيل التحقق من اللون
        setFavouriteRecipes(favourites.map((r: IRecipes) => r.id));
      } catch (error) {
        console.log(error);
      }
    }
    fetchFavouriteRecipe();
  }, []);

  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setRecipes([]);
      return;
    }
    try {
      const recipesData = await api.searchRecipes(searchTerm, 1);
      setRecipes(recipesData?.results ?? []);
      pageNumber.current = 1;
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewMore = async () => {
    const nextPage = pageNumber.current + 1;
    try {
      const nextRecipe = await api.searchRecipes("", nextPage);
      setRecipes((prev) => [...prev, ...nextRecipe.results]);
      pageNumber.current = nextPage;
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFavouriteRecipe = async (recipe: IRecipes) => {
    if (favouriteRecipes.includes(recipe.id)) {
      // إزالة من المفضلة
      await api.removeFavouriteRecipe({ recipeId: recipe.id, userId });
      setFavouriteRecipes(favouriteRecipes.filter((id) => id !== recipe.id));
    } else {
      // إضافة للمفضلة
      await api.addFavouriteRecipe({ recipeId: recipe.id, userId });
      setFavouriteRecipes([...favouriteRecipes, recipe.id]);
    }
  };

  return {
    recipes,
    defaultRecipes,
    favouriteRecipes,
    handleSearch,
    handleViewMore,
    toggleFavouriteRecipe,
  };
}

export default AppLogic;

import { useQuery } from "@tanstack/react-query";
import * as api from "../api/api";
import { token } from "../utils/constants";

const fetchFavouriteRecipe = async (userId: number) => {
    // جلب البيانات كاملة من الـ backend
    const favourites = await api.getFavouriteRecipes(userId, token ?? "");
    console.log("Fetched favourites:", favourites);
    // رجّع البيانات كلها
    return favourites.results;
}

const useFavouriteRecipeList = (userId: number) => {
    return useQuery({
        queryKey: ['favourites', userId],
        queryFn: () => fetchFavouriteRecipe(userId),
        enabled: !!userId,
    });
}

export default useFavouriteRecipeList;
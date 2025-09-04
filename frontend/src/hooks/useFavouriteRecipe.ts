import { useQuery } from "@tanstack/react-query";
import * as api from "../api/api"
import type IRecipes from "../interfaces";


const fetchFavouriteRecipe = async (userId: string) => {
    const favourites = await api.getFavouriteRecipes(userId,localStorage.getItem("token")||"");
    return favourites.map((r: IRecipes) => r.id)
}

const useFavouriteRecipe = ({ userId }: { userId: string }) => {
    return useQuery({
        queryKey: ['favouriteRecipes', userId],
        queryFn: () => fetchFavouriteRecipe(userId)
    })
}

export default useFavouriteRecipe;
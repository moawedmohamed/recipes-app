import { useInfiniteQuery } from "@tanstack/react-query"
import * as api from "../api/api"
import type IRecipes from "../interfaces";
type RecipeResponse = {
    data: IRecipes[];
    nextPage?: number;
};

const fetchRecipes = async ({ pageParam = 1 }: { pageParam?: number }): Promise<RecipeResponse> => {
    const response = await api.searchRecipes("", pageParam, localStorage.getItem("token") || "");
    return {
        data: response.data,
        nextPage: response.nextPage
    };
};


const useViewMoreRecipes = () => {
    return useInfiniteQuery<RecipeResponse>({
        queryKey: ["viewMoreRecipes"],
        queryFn: fetchRecipes,
        getNextPageParam: (lastPage) => {
            return lastPage?.nextPage ?? undefined
        },
    })
}

export default useViewMoreRecipes

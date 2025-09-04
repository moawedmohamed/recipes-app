import { useInfiniteQuery } from "@tanstack/react-query"
import * as api from "../api/api"
const SearchRecipesFunction = ({ searchTerm, pageNumber = 1 }: { searchTerm: string, pageNumber: number }) => {
    return api.searchRecipes(searchTerm, pageNumber, localStorage.getItem("token") || "")
}
const useSearchRecipes = (searchTerm: string) => {
    return useInfiniteQuery({
        queryKey: ['recipes', searchTerm],
        queryFn: ({ pageParam = 1 }) => SearchRecipesFunction({ searchTerm, pageNumber: pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPage) => {
            return lastPage.hasNextPage ? allPage.length + 1 : undefined
        }
    })
}

export default useSearchRecipes;
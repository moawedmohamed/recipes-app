import { useInfiniteQuery } from "@tanstack/react-query"
import * as api from "../api/api"

const SearchRecipesFunction = async({ searchTerm, pageNumber = 1 }: { searchTerm: string, pageNumber: number }) => {
    if (!searchTerm.trim()) return [];
    const data=await api.searchRecipes(searchTerm, pageNumber) // ❌ شيل الـ token هنا
    console.log(data);
    return data;
}

const useSearchRecipes = (searchTerm: string) => {
    return useInfiniteQuery({
        queryKey: ['recipes', searchTerm], // Unique key for the query cache
        queryFn: ({ pageParam = 1 }) =>
            SearchRecipesFunction({ searchTerm, pageNumber: pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            // لازم backend يرجّعلك معلومة فيها هل في صفحات تانية أو لا
            return lastPage?.hasNextPage ? allPages.length + 1 : undefined
        },
        enabled: !!searchTerm.trim(),
    })
}

export default useSearchRecipes

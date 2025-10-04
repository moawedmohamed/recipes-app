// useDefaultRecipes.ts
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/api';
import { token } from '../utils/constants';
import type { Recipe } from '../types';

interface FetchDefaultsParams {
    page?: number;
    limit?: number;
}

export const useDefaultRecipes = ({ page = 1, limit = 10 }: FetchDefaultsParams) => {
    return useQuery<Recipe[], Error>({
        queryKey: ['defaultRecipes', page, limit],
        queryFn: async () => {
            console.log("Fetching products with page:", page, "limit:", limit);
            const data = await getProducts(token ?? undefined, page, limit);

            // إذا الـ API يرجع { recipes: [...] } بدل مصفوفة مباشرة
            if (Array.isArray(data)) {
                console.log("Products fetched:", data);
                return data;
            } else if (data?.recipes && Array.isArray(data.recipes)) {
                console.log("Products fetched from data.recipes:", data.recipes);
                return data.recipes;
            } else {
                console.warn("No products found, returning empty array");
                return [];
            }
        },
        placeholderData: [] as Recipe[], // لإظهار مصفوفة فارغة قبل اكتمال fetch
            // 10 دقائق
    }); 
};

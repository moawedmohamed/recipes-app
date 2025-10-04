import axios from "axios";
import type { FavouritePayload } from "../types";

export const getProducts = async (token?: string, page: number = 1, limit: number = 10) => {
    const url = new URL("http://localhost:5000/api/recipes");
    url.searchParams.append("page", page.toString())
    url.searchParams.append("limit", limit.toString())
    try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        console.log("Calling API:", url.toString(), "with token:", token);
        const response = await axios.get(url.toString(), { headers });
        return response.data ?? [];
        // backend يرجع: recipes + favouriteIds لو مسجّل دخول
    } catch (error: any) {
        console.error("Error fetching products:", error);
        // لو 401 Unauthorized، ممكن backend يرد هنا كـ empty array أو top recipes
        if (error.response?.status === 401) {
            // fallback: رجع أول 10 recipes عامة
            const fallback = await axios.get(url.toString());
            if (Array.isArray(fallback.data.recipes)) return fallback.data.recipes;
        }
        throw error;
    }
};


export const searchRecipes = async (searchTerm: string, page: number, token?: string) => {
    const baseURL = new URL('http://localhost:5000/api/recipes/search');
    baseURL.searchParams.append("searchTerm", searchTerm)
    baseURL.searchParams.append("page", String(page))
    const response = await axios.get(baseURL.toString(), {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    console.log(response.data);
    return response.data;
}
export const getRecipeSummary = async (recipeId: string, token: string) => {
    const url = new URL(`http://localhost:5000/api/recipes/search/${recipeId}/summary`)
    const res = await axios.get(url.toString(), {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.data;
}
export const getFavouriteRecipes = async (userId: number, token: string) => {
    const url = new URL(`http://localhost:5000/api/recipes/favourite?userId=${userId}`);
    const response = await axios.get(url.toString(), {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    console.log(response);

    return response.data;
}

export const addFavouriteRecipe = async ({ recipeId, token }: FavouritePayload) => {
    const url = new URL(`http://localhost:5000/api/recipes/favourite`);
    const response = await axios.post(url.toString(),
        { recipeId },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
    console.log(response);

    return response.data;
};

// remove
export const removeFavouriteRecipe = async ({ recipeId, token }: FavouritePayload) => {
    const url = new URL(`http://localhost:5000/api/recipes/favourite`);
    const response = await axios.delete(url.toString(), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: { recipeId }
    });
    return response.data;
};

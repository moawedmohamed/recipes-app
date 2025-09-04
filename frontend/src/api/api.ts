import axios from "axios";
import type { FavouritePayload } from "../types";

export const getProducts = async (token: string) => {
    try {

        const url = new URL('http://localhost:5000/api/recipes');
        const response = await axios.get(url.toString(), {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

export const searchRecipes = async (searchTerm: string, page: number, token: string) => {
    const baseURL = new URL('http://localhost:5000/api/recipes/search');
    baseURL.searchParams.append("searchTerm", searchTerm)
    baseURL.searchParams.append("page", String(page))
    const response = await axios.get(baseURL.toString(), {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

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
export const getFavouriteRecipes = async (userId: string, token: string) => {
    const url = new URL(`http://localhost:5000/api/recipes/favourite?userId=${userId}`);
    const response = await axios.get(url.toString(), {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}

export const addFavouriteRecipe = async ({ recipeId, userId, token }: FavouritePayload) => {
    const url = new URL(`http://localhost:5000/api/recipes/favourite?userId=${userId}`);
    const response = await axios.post(url.toString(),
        { recipeId, userId },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
    return response.data;
};

// remove
export const removeFavouriteRecipe = async ({ recipeId, userId, token }: FavouritePayload) => {
    const url = new URL(`http://localhost:5000/api/recipes/favourite?userId=${userId}`);
    const response = await axios.delete(url.toString(), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: { recipeId, userId }
    });
    return response.data;
};
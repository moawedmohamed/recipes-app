import type { FavouritePayload } from "../types";

export const getProducts = async () => {
    try {
        const url = new URL('http://localhost:5000/api/recipes');
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ERROR with status :${response.status}`);
        }
        return response.json()
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

export const searchRecipes = async (searchTerm: string, page: number) => {
    const baseURL = new URL('http://localhost:5000/api/recipes/search');
    baseURL.searchParams.append("searchTerm", searchTerm)
    baseURL.searchParams.append("page", String(page))
    const response = await fetch(baseURL);
    if (!response.ok) {
        throw new Error(`HTTP ERROR with status :${response.status}`);

    }
    return response.json()
}
export const getRecipeSummary = async (recipeId: string) => {
    const url = new URL(`http://localhost:5000/api/recipes/search/${recipeId}/summary`)
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`HTTP Error ${res.status}`);

    }
    return res.json();
}
export const getFavouriteRecipes = async () => {
    const url = new URL('http://localhost:5000/api/recipes/favourite?userId=2');
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json()
}

export const addFavouriteRecipe = async ({ recipeId, userId }: FavouritePayload) => {
  const url = new URL('http://localhost:5000/api/recipes/favourite?userId=2');
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recipeId, userId }),
  });
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
};

// remove
export const removeFavouriteRecipe = async ({ recipeId, userId }: FavouritePayload) => {
  const url = new URL('http://localhost:5000/api/recipes/favourite?userId=2');
  const response = await fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recipeId, userId }),
  });
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
};
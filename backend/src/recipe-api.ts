
const apiKey = process.env.API_KEY
export const getTopRatedRecipes = async (page: number = 1, limit: number = 10) => {
    if (!apiKey) {
        throw new Error("API key not found");
    }
    const url = new URL("https://api.spoonacular.com/recipes/complexSearch");
    const offset = (page - 1) * limit
    const queryParams: Record<string, string> = {
        apiKey,
        number: limit.toString(),
        offset: offset.toString(),// عدد الوصفات المطلوب إرجاعها
        sort: "popularity",

        // addRecipeNutrition: "true",// مثلا تصنيف حسب الشعبية (بدون params من المستخدم)
    };
    url.search = new URLSearchParams(queryParams).toString();

    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Error fetching top rated recipes:", error);
        throw error;
    }
};

export const searchRecipes = async (searchTerm: string, page: number) => {
    if (!apiKey) {
        throw new Error("API key not found in environment variables");
    }
    const url = new URL("https://api.spoonacular.com/recipes/complexSearch");
    const queryParams: Record<string, string> = {
        apiKey,
        query: searchTerm,
        number: "10",
        offset: (page * 10).toString()
    }
    url.search = new URLSearchParams(queryParams).toString()
    try {
        const searchResponse = await fetch(url)
        const resultJson = await searchResponse.json();
        return resultJson;
    } catch (error) {
        console.log("the error is ", error);

    }
}
export const getRecipeSummary = async (recipeID: string) => {
    if (!apiKey) {
        throw new Error("API not found ");
    }
    const url = new URL(`https://api.spoonacular.com/recipes/${recipeID}/summary`)
    const prams = {
        apiKey,
    }
    url.search = new URLSearchParams(prams).toString()
    const response = await fetch(url)
    const json = await response.json();
    return json
}
export const getRecipesById = async (recipeId: number) => {
    const BASE_URL = "https://api.spoonacular.com/recipes";
    if (!apiKey) {
        throw new Error("API not found ");
    }
    try {
        const url = new URL(`${BASE_URL}/${recipeId}/information`)
        const params = {
            apiKey: apiKey
        }
        url.search = new URLSearchParams(params).toString()
        console.log("Spoonacular request URL:", url.toString());
        const res = await fetch(url)
        // if (!res.ok) {
        //     throw new Error(`Failed to fetch recipe by ID: ${res.statusText}`);
        // }
        const jsonData = await res.json()
        return jsonData
    } catch (error) {
        console.error("Error fetching recipe by ID:", error);
        throw error
    }
}
export const getFavouriteRecipeByIDs = async (ids: string[]) => {
    if (!apiKey) {
        throw new Error("API not found ");
    }
    const url = new URL('https://api.spoonacular.com/recipes/informationBulk')
    const params = {
        apiKey: apiKey,
        ids: ids.join(',')
    }
    url.search = new URLSearchParams(params).toString()
    const searchResponse = await fetch(url);
    const json = await searchResponse.json()
    return { results: json }
}


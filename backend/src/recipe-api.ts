
const apiKey = process.env.API_KEY
export const getTopRatedRecipes = async (page: number = 1, limit: number = 10,) => {
    if (!apiKey) {
        throw new Error("API key not found");
    }
    const searchUrl = new URL("https://api.spoonacular.com/recipes/complexSearch");

    const url = new URL("https://api.spoonacular.com/recipes/informationBulk");
    const offset = (page - 1) * limit
    searchUrl.search = new URLSearchParams({
        apiKey,
        offset: offset.toString(),
        number: limit.toString(),
        sort: "popularity"
    }).toString();
    const searchRes = await fetch(searchUrl.toString());
    const searchData = await searchRes.json();
    if (!searchData.results || searchData.results.length === 0) {
        return [];
    }
    const recipeIds = searchData.results.map((r: any) => r.id).join(",");
    const infoUrl = new URL("https://api.spoonacular.com/recipes/informationBulk");
    infoUrl.search = new URLSearchParams({
        apiKey,
        ids: recipeIds
    }).toString();
    const infoRes = await fetch(infoUrl.toString());
    const infoData = await infoRes.json();
    return infoData; // هيبقى فيه nutrition, pricePerServing, summary, إلخ


};

export const searchRecipes = async (searchTerm: string, page: number) => {
    if (!apiKey) {
        throw new Error("API key not found in environment variables");
    }
    try {
        // Step 1: Get recipes IDs
        const searchUrl = new URL("https://api.spoonacular.com/recipes/complexSearch");
        searchUrl.search = new URLSearchParams({
            apiKey,
            query: searchTerm,
            number: "10", // عدد النتائج في كل صفحة
            offset: ((page - 1) * 10).toString() // البداية الصح للصفحة
        }).toString();

        const searchResponse = await fetch(searchUrl.toString());
        const searchData = await searchResponse.json();
        console.log(searchData);
        if (!searchData.results || searchData.results.length === 0) {
            return [];
        }

        // Extract IDs
        const ids = searchData.results.map((r: any) => r.id).join(",");

        // Step 2: Get details + price
        const infoUrl = new URL("https://api.spoonacular.com/recipes/informationBulk");
        infoUrl.search = new URLSearchParams({
            apiKey,
            ids,
            includeNutrition: "false" // أو "true" لو عايز بيانات التغذية كاملة
        }).toString();

        const infoResponse = await fetch(infoUrl.toString());
        const infoData = await infoResponse.json();

        return infoData; // contains title, image, pricePerServing, ...
    } catch (error) {
        console.log("the error is ", error);
        return [];
    }
};


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


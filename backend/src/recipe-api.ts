
const apiKey = process.env.API_KEY

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



import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import cor from 'cors'
import * as RecipeAPI from './recipe-api'
import { PrismaClient } from '@prisma/client';
const app = express();
const prismaClient = new PrismaClient
app.use(express.json())
app.use(cor())
app.get('/api/recipes', async (req, res) => {
    try {
        const recipes = await RecipeAPI.getTopRatedRecipes(); // ترجع 10 وصفات مثلاً
        res.json(recipes);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).json({ error: "Failed to fetch recipes" });
    }
});

app.get('/api/recipes/search', async (req, res) => {
    const searchTerm = req.query.searchTerm as string
    const page = parseInt(req.query.page as string)
    const result = await RecipeAPI.searchRecipes(searchTerm, page)
    return res.json(result)
})
app.get('/api/recipes/search/:recipeId/summary', async (req, res) => {
    const recipeId = req.params.recipeId;
    const results = await RecipeAPI.getRecipeSummary(recipeId);
    return res.json(results)
})
app.post('/api/recipes/favourite', async (req, res) => {
    const recipeId = req.body.recipeId
    try {
        const favouriteRecipe = await prismaClient.favoriteRecipes.create({
            data: {
                recipeId: recipeId
            }
        })
        return res.status(201).json(favouriteRecipe)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Oops something went wrong " })
    }
})

app.get('/api/recipes/favourite', async (req, res) => {
    try {
        const response = await prismaClient.favoriteRecipes.findMany();
        const recipeIDs = response.map((recipe) => recipe.recipeId.toString())
        const favourites = await RecipeAPI.getFavouriteRecipeByIDs(recipeIDs)
        return res.json(favourites)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Oops something went wrong " })
    }
});
app.delete('/api/recipes/favourite', async (req, res) => {
    const recipeId = req.body.recipeId;
    try {
        await prismaClient.favoriteRecipes.delete({
            where: {
                recipeId: recipeId
            }
        })
        return res.status(204).send();
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Oops something went wrong " })
    }
})
const PORT: number = 5000
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);

})
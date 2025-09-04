import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import cor from 'cors'
import * as RecipeAPI from './recipe-api'
import { PrismaClient } from '@prisma/client';
import { testConnection } from './db';
import { verifyToken } from './auth/auth.middleware';
import { AuthRequest } from './interfaces';
import router from './auth/auth.routes';
import { connectRedis } from './redis';
const app = express();
app.use(express.json())
app.use(cor())
app.use("/api/auth", router);
const prismaClient = new PrismaClient
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
app.get('/api/recipes/favourite', verifyToken, async (req, res) => {
    try {
        const userId = (req as AuthRequest).userId;
        const response = await prismaClient.favoriteRecipes.findMany({ where: { userId } });
        const recipeIDs = response.map((recipe) => recipe.recipeId.toString())
        const favourites = await RecipeAPI.getFavouriteRecipeByIDs(recipeIDs)
        return res.json(favourites)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Oops something went wrong " })
    }
});
app.post('/api/recipes/favourite', verifyToken, async (req, res) => {
    const userId = (req as AuthRequest).userId;
    const { recipeId } = req.body
    try {
        const existing = await prismaClient.favoriteRecipes.findFirst({
            where: { recipeId, userId }
        });
        if (existing) {
            return res.status(400).json({ error: "Already in favourites" });
        }
        const favouriteRecipe = await prismaClient.favoriteRecipes.create({
            data: {
                recipeId: recipeId,
                user: {
                    connect: { id: userId }  // ربط favourite بالمستخدم رقم 2
                }
            }
        });
        return res.status(201).json(favouriteRecipe)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Oops something went wrong " })
    }
})


app.delete('/api/recipes/favourite', verifyToken, async (req: AuthRequest, res) => {
    const userId = req.userId;
    const { recipeId } = req.body;
    if (!userId) {
        return res.status(401).json({ error: "User not authenticated" });
    }
    try {
        await prismaClient.favoriteRecipes.delete({
            where: {
                recipeId_userId: {  // الاسم يعتمد على Prisma عند إنشاء المفتاح المركب
                    recipeId: recipeId,
                    userId: userId
                }
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
    testConnection();
    connectRedis(); 
})
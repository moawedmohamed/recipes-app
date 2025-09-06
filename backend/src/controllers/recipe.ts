import { prismaClient } from '../db';
import { AuthRequest } from '../interfaces';
import * as RecipeAPI from "../recipe-api"
import { Request, Response } from 'express';
import { deleteCache, getCache, setCache } from '../services/cache.service';

export const getTopRecipes = async (req: Request, res: Response) => {
    try {
        const cacheKey = 'top_recipes';
        const cachedData = await getCache(cacheKey);
        if (cachedData) {
            console.log('returned form cache ');
            return res.json(cachedData);
        }
        const recipes = await RecipeAPI.getTopRatedRecipes(); // ترجع 10 وصفات مثلاً
        await setCache(cacheKey, recipes, 3600)
        console.log('fetched from API');
        res.json(recipes);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).json({ error: "Failed to fetch recipes" });
    }
}
export const SearchRecipes = async (req: Request, res: Response) => {
    const searchTerm = req.query.searchTerm as string
    const page = parseInt(req.query.page as string)
    const cacheKey = `search${searchTerm}:${page}`
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
        console.log('returned form cache ');
        return res.json(cachedData);
    }
    const result = await RecipeAPI.searchRecipes(searchTerm, page)
    await setCache(cacheKey, result, 3600)
    console.log('Returned from API');
    return res.json(result)
}

export const getRecipeSummary = async (req: Request, res: Response) => {
    const recipeId = req.params.recipeId;
    const cacheKey = `summary:${recipeId}`;
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
        console.log('returned form cache ');
        return res.json(cachedData);
    }
    const results = await RecipeAPI.getRecipeSummary(recipeId);
    await setCache(cacheKey, results, 3600)
    console.log('Returned from API');
    return res.json(results)
}




export const getFavouriteRecipes = async (req: Request, res: Response) => {
    try {
        const userId = (req as AuthRequest).userId;
        const cacheKey = `favourite:${userId}`
        const cachedData = await getCache(cacheKey);
        if (cachedData) {
            console.log('returned from cache ');
            return res.json(cachedData);
        }
        const response = await prismaClient.favoriteRecipes.findMany({ where: { userId } });
        const recipeIDs = response.map((recipe) => recipe.recipeId.toString())
        const favourites = await RecipeAPI.getFavouriteRecipeByIDs(recipeIDs)
        setCache(cacheKey, favourites, 42000);
        console.log('returned from API ');
        return res.json(favourites)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Oops something went wrong " })
    }
}
export const addFavouriteRecipe = async (req: Request, res: Response) => {
    const userId = (req as AuthRequest).userId;
    const { recipeId } = req.body
    const cacheKey = `addFavourite:${userId}:${recipeId}`
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
        console.log('Returned from cache');
        return res.json(cachedData)
    }
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
        setCache(cacheKey, favouriteRecipe, 3600)
        console.log('returned from cache ');
        return res.status(201).json(favouriteRecipe)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Oops something went wrong " })
    }
}
export const deleteFavouriteRecipe = async (req: AuthRequest, res: Response) => {
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
        const cacheKey = `favourite:${userId}:${recipeId}`;
        await deleteCache(cacheKey);
        return res.status(204).send();
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Oops something went wrong " })
    }
}
import { prismaClient } from '../db';
import { AuthRequest } from '../interfaces';
import * as RecipeAPI from "../recipe-api"
import { Request, Response } from 'express';

export const getTopRecipes = async (req: Request, res: Response) => {
    try {
        const recipes = await RecipeAPI.getTopRatedRecipes(); // ترجع 10 وصفات مثلاً
        res.json(recipes);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).json({ error: "Failed to fetch recipes" });
    }
}
export const SearchRecipes = async (req: Request, res: Response) => {
    const searchTerm = req.query.searchTerm as string
    const page = parseInt(req.query.page as string)
    const result = await RecipeAPI.searchRecipes(searchTerm, page)
    return res.json(result)
}

export const getRecipeSummary = async (req: Request, res: Response) => {
    const recipeId = req.params.recipeId;
    const results = await RecipeAPI.getRecipeSummary(recipeId);
    return res.json(results)
}
export const getFavouriteRecipes = async (req: Request, res: Response) => {
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
}
export const addFavouriteRecipe = async (req: Request, res: Response) => {
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
        return res.status(204).send();
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Oops something went wrong " })
    }
}
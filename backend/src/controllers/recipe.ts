import { prismaClient } from '../db';
import { AuthRequest } from '../interfaces';
import * as RecipeAPI from "../recipe-api"
import { Request, Response } from 'express';
import { deleteCache, getCache, setCache } from '../services/cache.service';

export const getTopRecipes = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10
        const cacheKey = `top_recipes_page_${page}_limit_${limit}`;
        const cachedData = await getCache(cacheKey);
        if (cachedData) {
            console.log('returned form cache ');
            return res.json(cachedData);
        }
        const recipes = await RecipeAPI.getTopRatedRecipes(page, limit); // ترجع 10 وصفات مثلاً
        await setCache(cacheKey, recipes, 42000)
        console.log('fetched from API');
        res.json(recipes);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).json({ error: "Failed to fetch recipes" });
    }
}
export const getRecipeByID = async (req: Request, res: Response) => {
    console.log("req.params:", req.params); // ⬅️ أضف ده
    const { recipeId } = req.params;
    console.log("recipeId:", recipeId, "type:", typeof recipeId); // ⬅️
    const cacheKey = `recipe:${recipeId}`
    try {
        // const cacheData = await getCache(cacheKey);
        // if (cacheData) {
        //     console.log('returned from the cache');
        //     return res.json(cacheData)
        // }
        const recipe = await RecipeAPI.getRecipesById(Number(recipeId))
        await setCache(cacheKey, recipe, 42000)
        console.log('returned form API');
        return res.json(recipe)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to fetch recipe details" });
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
    await setCache(cacheKey, result, 42000)
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
        const response = await prismaClient.favoriteRecipes.findMany({ where: { userId: Number(userId) } });
        const recipeIDs = response.map((recipe) => recipe.recipeId.toString())
        const favourites = await RecipeAPI.getFavouriteRecipeByIDs(recipeIDs)
        if (favourites) {
            await setCache(cacheKey, favourites, 42000);
        }
        console.log('returned from API ');
        console.log(res);

        return res.json(favourites)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Oops something went wrong " })
    }
}

export const addFavouriteRecipe = async (req: Request, res: Response) => {
    const userId = (req as AuthRequest).userId;
    if (!userId) {
        return res.status(401).json({ error: "User not authenticated" });
    }
    const { recipeId } = req.body
    const cacheKey = `favourite:${userId}`
    // const cachedData = await getCache(cacheKey);
    // if (cachedData) {
    //     console.log('Returned from cache');
    //     return res.json(cachedData)
    // }
    try {
        const existing = await prismaClient.favoriteRecipes.findUnique({
            where: { recipeId_userId: { recipeId, userId } }
        });
        let message = "";
        let favouriteRecipe: any = null; // ✅ متغير متعّرف فوق

        if (existing) {
            await prismaClient.favoriteRecipes.delete({
                where: { recipeId_userId: { recipeId, userId } }
            })
            message = "Removed from favourites";
        } else {
            favouriteRecipe = await prismaClient.favoriteRecipes.create({
                data: {
                    recipeId: recipeId,
                    user: {
                        connect: { id: userId }  // ربط favourite بالمستخدم رقم 2
                    }
                }
            });
            message = "Added to favourites";
        }
        const rows = await prismaClient.favoriteRecipes.findMany({ where: { userId } });
        const recipeIDs = rows.map(r => r.recipeId.toString());
        // افترض أن لديك دالة خارجية تحول IDs إلى بيانات الوصفات التفصيلية
        const favourites = await RecipeAPI.getFavouriteRecipeByIDs(recipeIDs);
        // احفظ النتيجة في الكاش (انتظر التنفيذ)
        await setCache(cacheKey, favourites ?? [], 3600);

        console.log(favouriteRecipe);

        return res.status(201).json({ message, favouriteRecipe })
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
        const cacheKey = `favourite:${userId}`;
        await deleteCache(cacheKey);
        return res.status(204).send();
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Oops something went wrong " })
    }
}
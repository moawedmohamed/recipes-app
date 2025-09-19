import { Router } from "express";
import {
    addFavouriteRecipe,
    deleteFavouriteRecipe,
    getFavouriteRecipes,
    getRecipeSummary,
    getTopRecipes,
    SearchRecipes,
    getRecipeByID
} from "../controllers/recipe";
import { verifyToken } from "../auth/auth.middleware";
import { getRecipesById } from "../recipe-api";

const recipeRouter = Router();
recipeRouter.get("/", getTopRecipes);
recipeRouter.get('/recipe/:recipeId', getRecipeByID)
recipeRouter.get("/search", SearchRecipes);
recipeRouter.get("/search/:recipeId/summary", getRecipeSummary);
recipeRouter.get("/favourite", verifyToken, getFavouriteRecipes);
recipeRouter.post("/favourite", verifyToken, addFavouriteRecipe);
recipeRouter.delete("/favourite/:recipeId", verifyToken, deleteFavouriteRecipe);
export default recipeRouter;
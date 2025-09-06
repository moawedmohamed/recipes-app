import { Router } from "express";
import {
    addFavouriteRecipe,
    deleteFavouriteRecipe,
    getFavouriteRecipes,
    getRecipeSummary,
    getTopRecipes,
    SearchRecipes,
} from "../controllers/recipe";
import { verifyToken } from "../auth/auth.middleware";

const recipeRouter = Router();
recipeRouter.get("/", getTopRecipes);
recipeRouter.get("/search", SearchRecipes);
recipeRouter.get("/search/:recipeId/summary", getRecipeSummary);
recipeRouter.get("/favourite", verifyToken, getFavouriteRecipes);
recipeRouter.post("/favourite", verifyToken, addFavouriteRecipe);
recipeRouter.delete("/favourite", verifyToken, deleteFavouriteRecipe);
export default recipeRouter;
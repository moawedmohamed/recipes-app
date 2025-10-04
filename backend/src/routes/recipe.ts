import { Router } from "express";
import {
    addFavouriteRecipe,
    deleteFavouriteRecipe,
    getFavouriteRecipes,
    getRecipeSummary,
    getTopRecipes,
    SearchRecipes,
    getRecipeByID,
    updateCartItem,
    removeCartItem,
    getCart,
    addToCart
} from "../controllers/recipe";
import { verifyToken } from "../auth/auth.middleware";

const recipeRouter = Router();
recipeRouter.get("/", getTopRecipes);
recipeRouter.get('/recipe/:recipeId', getRecipeByID)
recipeRouter.get("/search", SearchRecipes);
recipeRouter.get("/search/:recipeId/summary", getRecipeSummary);
recipeRouter.get("/favourite", verifyToken, getFavouriteRecipes);
recipeRouter.delete("/favourite/:recipeId", verifyToken, deleteFavouriteRecipe);
recipeRouter.post("/favourite", verifyToken, addFavouriteRecipe);
recipeRouter.get("/cart", verifyToken, getCart)
recipeRouter.post("/cart", verifyToken, addToCart);
recipeRouter.put("/cart", verifyToken, updateCartItem)
recipeRouter.delete("/cart/:cartItemId", verifyToken, removeCartItem);
export default recipeRouter;
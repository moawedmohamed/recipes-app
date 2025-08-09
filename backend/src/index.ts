import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import cor from 'cors'
import * as RecipeAPI from './recipe-api'
const app = express();
app.use(express.json())
app.use(cor())
app.get('/api/recipe/search', async (req, res) => {
    const searchTerm = req.query.searchTerm as string
    const page = parseInt(req.query.page as string)
    const result = await RecipeAPI.searchRecipes(searchTerm, page)
    return res.json(result)
})
app.get('/api/recipe/search/:recipeId/summary', async (req, res) => {
    const recipeId = req.params.recipeId;
    const results = await RecipeAPI.getRecipeSummary(recipeId);
    return res.json(results)
})
const PORT: number = 5000
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);

})
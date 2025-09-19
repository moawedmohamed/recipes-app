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
import recipeRouter from './routes/recipe';
import morgan from 'morgan'
const app = express();
app.use(express.json())
app.use(cor())
app.use(morgan("dev"))
app.use("/api/auth", router);
app.use('/api/recipes', recipeRouter)

const PORT: number = 5000
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
    testConnection();
    connectRedis();
})
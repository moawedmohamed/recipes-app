import { Router } from "express";
import * as authController from "./auth.controller"
import { verifyToken } from './auth.middleware';
const router = Router()
router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/me', verifyToken, authController.getProfile)
export default router;
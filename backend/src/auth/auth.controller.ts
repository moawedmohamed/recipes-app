import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const prismaClient = new PrismaClient();

// * sign up function
export const signup = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await prismaClient.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already taken" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prismaClient.user.create({
            data: { name: username, email, password: hashedPassword },
            select: { id: true, name: true, email: true, createdAt: true } // بدون كلمة المرور
        });
        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            data: user
        });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ error: "an error occurred on the server" })
    }
}

//* login function
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const existingUser = await prismaClient.user.findUnique({ where: { email } });
        if (!existingUser) {
            return res.status(400).json({ success: false, message: "No account found, please sign up first" });
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "the email or password is not correct" });
        }
        const token = jwt.sign({ userId: existingUser.id, jti: crypto.randomUUID() }, process.env.JWT_SECRET as string, {
            expiresIn: "7d",
        });
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token
        });
    } catch (error) {
        return res.status(500).json({ error: "an error occurred on the server" })
    }
}
export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = Number((req as any).userId);
        const user = await prismaClient.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true, email: true, createdAt: true }
        })
        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found " })
        }
        return res.status(200).json(user)

    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ error: "an error occurred on the server" })
    }
}
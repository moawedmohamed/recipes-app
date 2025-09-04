import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { AuthRequest } from "../interfaces";

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Access denied, token missing" });
        }
        const token = authHeader.split(" ")[1]
        const decode = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number }
        (req as AuthRequest).userId = decode.userId
        next();
    }   
    catch (error) {
        // 7. لو حصل خطأ في التحقق (التوكن غير صحيح أو انتهت صلاحيته)
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}
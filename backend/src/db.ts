// db.ts
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const testConnection = async () => {
    try {
        await prisma.$queryRaw`SELECT 1`; // اختبار الاتصال
        console.log("✅ Database connected successfully with Prisma!");
    } catch (error) {
        console.error("Database connection failed with Prisma", error);
    }
};

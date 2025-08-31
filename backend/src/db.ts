import { Pool } from 'pg'
import dotenv from "dotenv"

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
})
export const testConnection = async () => {
    try {
        const client = await pool.connect();
        console.log("✅ Database connected successfully!");
        client.release();
    } catch (error) {
        console.log('Database connection failed', error);
    }
} 
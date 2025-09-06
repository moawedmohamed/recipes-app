import redisClient from "../redis"
export const setCache = async (key: string, value: any, ttl: number = 3600) => {
    await redisClient.set(key, JSON.stringify(value), {
        EX: ttl
    })
}
export const getCache = async (key: string) => {
    try {
        const data = await redisClient.get(key);
        if (!data) return null;
        try {
            return JSON.parse(data);
        } catch (jsonError) {
            console.error(`Error parsing cache key "${key}":`, jsonError);
            return null;
        }
    } catch (error) {
        console.error(`Error adding  cache key "${key}":`, error);

    }
}
export const deleteCache = async (key: string) => {
    try {
        const result = await redisClient.del(key);
        if (result === 1) {
            console.log(`Cache key "${key}" deleted successfully.`);
        } else {
            console.log(`Cache key "${key}" not found.`);
        }
    } catch (error) {
        console.error(`Error deleting cache key "${key}":`, error);

    }
}
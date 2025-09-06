import { createClient } from 'redis';
 const redisClient = createClient({
    url: process.env.REDIS_URL as string
})
redisClient.on('error', (err) => console.log('Redis Client Error', err));
export const connectRedis = async () => {
    await redisClient.connect();
    console.log("Redis connected");

}

export default redisClient;
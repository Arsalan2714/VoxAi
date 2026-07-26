import Redis from 'ioredis';

const redis = new Redis(process.env.Redis_URL);

redis.on("connect", () => {
    console.log("Redis connected successfully");
})



export default redis;
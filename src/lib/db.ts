import { Redis } from "@upstash/redis"

// process.env.[...] variables protect sensitive tokens

export const db = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
})
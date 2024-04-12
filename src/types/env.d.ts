// This ensures environment variables are typed as strings and not overloaded for db.ts
declare namespace NodeJS {
    interface ProcessEnv {
        UPSTASH_REDIS_REST_URL: string,
        UPSTASH_REDIS_REST_TOKEN: string
    }
}
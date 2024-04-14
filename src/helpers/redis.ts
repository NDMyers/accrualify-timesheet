const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL
const authToken = process.env.UPSTASH_REDIS_REST_TOKEN

type Command = 'zrange' | 'sismember' | 'get' | 'smembers' | 'srem'

export async function fetchRedis(
    command: Command,
    ...args: (string | number)[]
) {
    const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join('/')}`

    const response = await fetch( commandUrl, {
        headers: {
            Authorization: `Bearer ${authToken}`
        },
        cache: 'no-cache',
    })

    if( !response.ok ) {
        throw new Error(`Error executing Redis command: ${response.statusText}`)
    }

    const data = await response.json()
    
    return data.result

}
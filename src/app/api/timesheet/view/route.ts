import { fetchRedis } from "@/helpers/redis"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

export async function GET(req: Request) {
    try {
        
        const session = await getServerSession(authOptions)

        if (!session) {
            return new Response('Unauthorized', { status: 401 })
        }

        const data = await fetchRedis('get', `user:${session.user.id}:timesheets`)
        console.log(data)

        if (!data) {
            return new Response('Invalid data request')
        }

        return data

    } catch (error) {
        return new Response('Invalid post request')
    }
}
import { fetchRedis } from "@/helpers/redis"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { nanoid } from "nanoid"

export async function POST(req: Request) {
    try {
        
        let body = await req.json()
        body = body.timeSheet

        const session = await getServerSession(authOptions)

        if (!session) {
            return new Response('Unauthorized', { status: 401 })
        }

        // Post new timesheet to user's database
        // nanoid() generates randomzied ID for object
        db.sadd(`user:${session.user.id}:timesheets`, {id: nanoid(), timeSheet: body})

        return new Response('OK', { status: 200 })

    } catch (error) {
        return new Response('Invalid post request', { status: 500 })
    }
}
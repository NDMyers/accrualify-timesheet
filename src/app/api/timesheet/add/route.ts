import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"

export async function POST(req: Request) {
    try {
        
        const body = await req.json()
        console.log(body)

        const session = await getServerSession(authOptions)

        if (!session) {
            return new Response('Unauthorized', { status: 401 })
        }

        // Post new timesheet to user's database
        db.sadd(`user:${session.user.id}:timesheets`, body)

        return new Response('OK')

    } catch (error) {
        return new Response('Invalid post request')
    }
}
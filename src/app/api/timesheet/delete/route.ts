import { fetchRedis } from "@/helpers/redis"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"

export async function POST(req: Request) {

    try {
        const body = await req.json()
        const parsedBody = JSON.stringify(body.string)

        const session = await getServerSession(authOptions)
        if (!session) notFound()

        // Deletes member from timesheet db
        await fetchRedis(
            `srem`,
            `user:${session.user.id}:timesheets`,
            `${parsedBody}`
        )

        return new Response('OK')

    } catch (error) {
        return new Response('Invalid post request', { status: 500 })
    }

}
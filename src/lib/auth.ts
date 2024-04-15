import { NextAuthOptions, User } from "next-auth";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { db } from "./db";
import GoogleProvider from "next-auth/providers/google"

// Fetches Google API environment variables from .env.local
function getGoogleCredentials() {
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET

    if( !clientId || clientId.length === 0 ) {
        throw new Error('Missing GOOGLE_CLIENT_ID')
    }
    
    if( !clientSecret|| clientSecret.length === 0 ) {
        throw new Error('Missing GOOGLE_CLIENT_SECRET')
    }

    return { clientId, clientSecret }
}

export const authOptions: NextAuthOptions = {
    adapter: UpstashRedisAdapter(db),
    session: {
        // jwt strategy [json-wrapped tokens] so we can verify session in middleware to protect routes 
        strategy: 'jwt'
    },
    pages: {
        // Where authentication occurs, page-wise
        signIn: '/login'
    },
    // Only authentication provider for this program is Google
    providers: [
        GoogleProvider({
            clientId: getGoogleCredentials().clientId,
            clientSecret: getGoogleCredentials().clientSecret
        }),
    ],
    callbacks: {
        // Controlling what should be returned when authenticated and logged in
        async jwt ({ token, user }) {
            const dbUserResult = ( await db.get(`user:${user}`)) as
                | string
                | null
            
            if( !dbUserResult ) {
                if( user ) {
                    token.id = user.id
                }
                return token
            }
            
            const dbUser = JSON.parse(dbUserResult) as User

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image
            }
        },

        // When session is verified via getServerSession(authOptions)
        // these attributes are returned if token is valid
        async session({ session, token }) {
            if( token ) {
                session.user.id = token.id,
                session.user.email = token.email
                session.user.name = token.name
                session.user.image = token.picture
            }
            return session
        },

        redirect() {
            return '/dashboard'
        },
    },
}
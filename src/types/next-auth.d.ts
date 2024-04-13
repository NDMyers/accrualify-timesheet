// Type file for defining assetions for next-auth interactions

import type { Session, User } from "next-auth"
import type { JWT } from "next-auth/jwt"

type UserId = string

// Anywhere we use jwt, assert that have a corresponding id
declare module 'next-auth/jwt' {
    interface JWT {
        id: UserId
    }
}

// Anywhere we use next-auth, assert that we use an interface 'Session'
declare module 'next-auth' {
    interface Session {
        user: User & {
            id: userId
        }
    }
}
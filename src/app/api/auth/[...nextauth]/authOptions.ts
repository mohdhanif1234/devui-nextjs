import prisma from '@/database/prisma.config';
import { User } from '@prisma/client';
import { AuthOptions, ISODateString } from 'next-auth'
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from "next-auth/providers/credentials";

// Custom Type
export interface CustomSession {
    user?: any,
    expires: ISODateString
}
export interface CustomUser {
    id?: string | null
    name?: string | null
    email?: string | null
    image?: string | null
}

export const authOptions: AuthOptions = {
    pages: {
        signIn: '/login'
    },
    providers: [
        CredentialsProvider({
            name: "Sign in with DevUI",
            credentials: {
                email: { label: "email", type: "email", },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials, req) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    },
                    select: {
                        id: true,
                        email: true,
                        name: true
                    }
                })

                if (user) {
                    return { id: user.id.toString(), name: user.name, email: user.email }
                }
                else {
                    return null
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.user = user
            }
            return token
        },
        async session({ session, token, user }: any) {
            session.user = token.user
            return session
            // return {
            //     ...session,
            //     user: {
            //         ...session.user,
            //         id: token.user.id
            //     }
            // }
        }
    }
}
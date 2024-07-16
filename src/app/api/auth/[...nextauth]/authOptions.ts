import { AuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    pages: {
        signIn: '/login'
    },
    providers: [
        CredentialsProvider({
            name: "Sign in with DevUI",
            credentials: {
                username: { label: "email", type: "email", placeholder: "email" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials, req) {
                const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
                if (user) {
                    return user
                } else {
                    return null
                }
            }
        })
    ]
}
export type AuthErrorType = {
    name?: string
    email?: string
    password?: string
}

export type PostErrorType = {
    title?: string
    description?: string
    image?: string
}

export interface PostType {
    id: number
    user_id: number
    title: string
    description: string
    image: string
    created_at: string
    user: {
        name: string
    }
}
import Navbar from '@/components/Navbar'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/authOptions'
import SignoutBtn from '@/components/SignoutBtn'
import AddPost from '@/components/AddPost'
import { headers } from 'next/headers'
import { PostType } from '@/types/types'
import UserPostCard from '@/components/UserPostCard'

export async function getUserPost() {
    const res = await fetch(`${process.env.APP_URL}/api/user/post`, {
        headers: headers()
    })
    if (!res.ok) {
        throw new Error("Something went wrong during fetch.");
    }
    const response = await res.json();
    console.log('Response----', response)
    return response?.data;
}

export default async function Profile() {
    const session: any = await getServerSession(authOptions)
    const posts = await getUserPost();

    console.log('Posts----', posts)

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <div className="text-center">
                    <h1 className="text-3xl">
                        Hello, {session?.user?.name}
                    </h1>

                    <div className='mt-5 flex justify-center items-center '>
                        <AddPost user_id={session?.user?.id!} />
                        <SignoutBtn />
                    </div>

                    <div className="flex justify-center items-center mt-10">
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                            {
                                posts !== undefined && posts !== null ? (
                                    posts.map((item: PostType) => (
                                        <UserPostCard post={item} />
                                    ))
                                ) : (
                                    <div>No Post found!</div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

import Navbar from '@/components/Navbar'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/authOptions'
import SignoutBtn from '@/components/SignoutBtn'
import AddPost from '@/components/AddPost'

export default async function Profile() {
    const session: any = await getServerSession(authOptions)

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
                </div>
            </div>
        </div>
    )
}

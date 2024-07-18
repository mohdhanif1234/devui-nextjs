import Navbar from '@/components/Navbar'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/authOptions'
import SignoutBtn from '@/components/SignoutBtn'

export default async function Profile(){
    const session: any = await getServerSession(authOptions)

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <div className="text-center">
                    <h1 className="text-3xl">
                        Hello, {session?.user?.name}
                    </h1>
                    <SignoutBtn/>
                </div>
            </div>
        </div>
    )
}

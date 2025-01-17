'use client'
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { usePathname } from 'next/navigation'
import { useSession } from "next-auth/react"

const Navbar = () => {
    const pathName: string = usePathname();
    const {data:session, status} = useSession();

    return (
        <div className="h-16 w-full flex justify-between items-center px-6">
            <div className="flex items-center justify-center">
                <Image
                    alt='logo'
                    src={'/images/logo.png'}
                    width={40}
                    height={40}
                />

                <h1 className="text-3xl font-bold ml-2">DevUI</h1>
            </div>

            <div>
                <Link href={'/'}>
                    <Button
                        variant={"link"}
                        className={`text:md lg:text-lg ${pathName === '/' ? "font-bold text-orange-400" : ""}`}
                    >Home
                    </Button>
                </Link>
                <Link href={'/explore'}>
                    <Button
                        variant={"link"}
                        className={`text:md lg:text-lg ${pathName === '/explore' ? "font-bold text-orange-400" : ""}`}
                    >Explore
                    </Button>
                </Link>
                {
                    status==="authenticated" ? 
                <Link href={'/profile'}>
                    <Button
                        variant={"link"}
                        className={`text:md lg:text-lg ${pathName === '/profile' ? "font-bold text-orange-400" : ""}`}
                    >Profile
                    </Button>
                </Link> :
                 <Link href={'/login'}>
                 <Button
                     variant={"link"}
                     className="text-md lg:text-lg"
                 >Login
                 </Button>
             </Link>

                }
            </div>
        </div>
    )
}

export default Navbar

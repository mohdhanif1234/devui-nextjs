'use client'
import { Button } from "@/components/ui/button"
import Image from "next/image"

const Error = ({error, reset}:{error:Error, reset:()=>void}) => {
    return (
        <div>
            <div className="h-screen w-screen flex justify-center items-center">
                <Image
                    src={"/images/error.svg"}
                    alt="error image"
                    width={400}
                    height={400}
                />
               <Button onClick={()=>reset()}>Try Again</Button>
            </div>
        </div>
    )
}

export default Error

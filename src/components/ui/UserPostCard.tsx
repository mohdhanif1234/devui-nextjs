'use client'
import { formatDate } from "@/lib/utils"
import { PostType } from "@/types/types"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const UserPostCard = ({ post }: { post: PostType }) => {
    return (
        <div className="text-left">
            <div className="w-[500px] h-[500px] shadow-md rounded-md">
                <div className="p-5 flex justify-between flex-col">
                    <div className="p-5 flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold">
                                {post.user.name}
                            </h1>
                            <p>{formatDate(post.created_at)}</p>
                        </div>
                        <Button
                            variant={"destructive"}
                        >
                            Delete
                        </Button>
                    </div>

                    <Image
                        src={`http://localhost:3000/uploads/${post.image}`}
                        width={50}
                        height={50}
                        className="w-full h-[300px] object-cover"
                        alt=""
                        unoptimized
                    />

                    <div className="p-5">
                        <h1 className="text-3xl font-bold break-words">{post.title}</h1>
                        <p className="text-md break-words">{post.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPostCard

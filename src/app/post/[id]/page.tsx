import Navbar from "@/components/Navbar"
import PostCard from "@/components/PostCard"
import { getPost } from "@/lib/serverMethods"
import { PostType } from "@/types/types"

const ShowPost = async ({ params }: { params: { id: number } }) => {
  const post: PostType = await getPost(params.id)
  return (
    <div>
      <Navbar />
      <div className="h-screen w-full flex justify-center items-center">
        <PostCard post={post} />
      </div>
    </div>
  )
}

export default ShowPost

import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import Navbar from "@/components/Navbar";
import { PostType } from "@/types/types";
import PostCard from "@/components/PostCard";
import { getUserPost } from "./profile/page";

export default async function Home() {
  const posts: PostType[] = await getUserPost()
  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="flex justify-center flex-col items-center">
          <h1 className="text-5xl font-bold">UI Home</h1>
          <p className="text-3xl">Find world's best UI/UX from amazing developers</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
            {
              posts !== null && posts !== undefined ? (
                posts.map((item: PostType) => (
                  <PostCard key={item.id} post={item} />
                ))
              ) : (
                <div>No posts found for you</div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

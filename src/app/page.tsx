import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import Navbar from "@/components/Navbar";
import { PostType } from "@/types/types";
import PostCard from "@/components/PostCard";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getAllPosts() {
  const res = await fetch(`${process.env.APP_URL}/api/all`, {
      headers: headers()
  })
  if (!res.ok) {
      throw new Error("Something went wrong during fetch.");
  }
  const response = await res.json()
  console.log('Response----', response)
  return response?.data;
}

export default async function Home() {
  const session = await getServerSession();

  if(!session){
    redirect('/register')
  }
  const posts: PostType[] = await getAllPosts()
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

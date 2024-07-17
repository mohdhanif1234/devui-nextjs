import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

export default async function Home() {
  const session=await getServerSession(authOptions)
  return (
    <div>
      <h1>Hello world</h1>
      <Button>Hello</Button>
      {
        session?<p>{JSON.stringify(session)}</p>:<></>
      }
    </div>
  );
}

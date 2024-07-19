import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

const PostDeleteBtn = ({ id }: { id: number }) => {
    const router = useRouter();
    const { toast } = useToast();
    const deletePost = () => {
        axios.delete(`/api/user/post/${id}`)
            .then(res => {
                const response = res.data;

                if (response.status === 200) {
                    toast({
                        title: 'Success',
                        description: response.message,
                        className: "bg-green-400"
                    })
                    router.refresh()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant={"destructive"}
                >
                    Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your post.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deletePost} className="bg-red-500">Yes Delete It!</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default PostDeleteBtn

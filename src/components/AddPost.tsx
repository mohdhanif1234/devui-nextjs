"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter
} from "@/components/ui/sheet"
import { Button } from "./ui/button"
import React, { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "./ui/textarea"
import { PostErrorType } from "@/types/types"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

const AddPost = ({ user_id }: { user_id: string }) => {
    const [sheetOpen, setSheetOpen] = useState<boolean>(false);

    const [postState, setPostState] = useState({
        title: '',
        description: ''
    })

    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState<boolean>();
    const [errors, setErrors] = useState<PostErrorType>({})

    const router=useRouter()
    const { toast } = useToast()

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        setFile(file!)
    }

    const handleSubmit = () => {
        console.log('Post state---', postState)
        console.log('File is---', file)

        setLoading(true);
        const formData = new FormData();
        formData.append('title', postState.title)
        formData.append('description', postState.description)
        formData.append('image', file!)
        formData.append('user_id', user_id)

        axios.post("/api/user/post", formData)
            .then(res => {
                setLoading(false)
                const response = res.data;
                if (response.status === 200) {
                    toast({
                        title:'Post created',
                        description:response.message,
                        className:"bg-green-400"
                    })

                    setSheetOpen(false)
                    router.refresh();
                }
                else if (response.status === 400) {
                    setErrors(response.errors)
                }
            })
            .catch(err => {
                setLoading(false);
                console.log('Post error is ---', err)
            })
    }

    return (
        <>
            <Sheet open={sheetOpen}>
                <SheetTrigger asChild>
                    <Button onClick={() => setSheetOpen(true)}>Add Post</Button>
                </SheetTrigger>
                <SheetContent showCloseBtn={false}>
                    <SheetHeader>
                        <SheetTitle>Add your amazing work</SheetTitle>
                        <SheetDescription>
                            Display your amazing UI/UX work to the world
                        </SheetDescription>
                    </SheetHeader>

                    <div className="mt-4">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            type="text"
                            id="title"
                            placeholder="Enter your UI/UX title"
                            value={postState.title}
                            onChange={e => setPostState({ ...postState, title: e.target.value })}
                        />

                        <span className="text-red-400 font-bold">{errors?.title}</span>
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Enter your description"
                            value={postState.description}
                            onChange={e => setPostState({ ...postState, description: e.target.value })}
                        ></Textarea>
                        <span className="text-red-400 font-bold">{errors?.description}</span>
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="image">Image</Label>
                        <Input
                            type="file"
                            id="image"
                            onChange={handleFileChange}
                        />
                        <span className="text-red-400 font-bold">{errors?.image}</span>
                    </div>

                    <SheetFooter className="mt-4">
                        <Button
                            onClick={handleSubmit}
                            disabled={loading}
                            variant={"default"}>
                            {loading ? "Processing..." : "Submit"}
                        </Button>
                        <Button onClick={() => setSheetOpen(false)} variant={"destructive"}>
                            Close
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </>
    )
}

export default AddPost

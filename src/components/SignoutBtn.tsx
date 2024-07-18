"use client"
import { Button } from "./ui/button"
import { signOut } from "next-auth/react"
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

const SignoutBtn = () => {
    const handleLogout = () => {
        signOut({ callbackUrl: '/login', redirect: true })
    }

    return (
        <>
            <div className="ml-5">
                <AlertDialog>
                    <AlertDialogTrigger>
                        <Button
                            variant={"destructive"}
                        // onClick={handleLogout}
                        >Sign Out
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                After this you will be logged out from this app and you have to log in again to acess your profile page.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleLogout}>Yes Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </>
    )
}

export default SignoutBtn

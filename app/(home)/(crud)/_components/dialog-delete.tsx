import { useMutation } from "convex/react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Id } from "@/convex/_generated/dataModel"
import { api } from "@/convex/_generated/api"

export function DialogDelete({
    children,
    postId
}: {
    children: React.ReactNode,
    postId: Id<"posts">
}) {
    const deletePost = useMutation(api.posts.del);

    const handleDelete = (postId: Id<"posts">) => {
        deletePost({ postId });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete this message</DialogTitle>
                    <DialogDescription>
                        Are you sure? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="destructive"
                        onClick={() => handleDelete(postId)}
                    >
                        Confirm delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

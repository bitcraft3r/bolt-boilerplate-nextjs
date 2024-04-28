import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Heart, Trash2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useStoreUserEffect from "@/hooks/useStoreUserEffect";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { DialogDelete } from "./_components/dialog-delete";

dayjs.extend(relativeTime);

const ShowPosts = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const { user } = useUser();
    // console.log(`clerk user data`, user);

    const userId = useStoreUserEffect();
    let allPosts = useQuery(api.posts.read);
    const editPost = useMutation(api.posts.update);

    // TODO: for allPosts, implement pagination and show with lazy load (show only 10 posts at first load)

    if (!isLoading && !isAuthenticated) {
        if (allPosts === null || allPosts === undefined) {
            return (<></>);
            // alternatively, show mock data
        }

        let postsToDisplay = 5;

        // If too many posts found, return truncated version of allPosts
        if (allPosts?.length > postsToDisplay) {
            const latestPosts = allPosts.slice(0, postsToDisplay).map(post => {
                return { ...post };
            });
            allPosts = latestPosts;
        }
    }

    const handleEdit = (postId: Id<"posts">, likes: number) => {
        editPost({ id: postId, likes });
    }

    // TODO: for every post, i want to fetch the user's data using the post.authorId. then use the post.author.username post.author.pictureUrl etc to populate the DOM. 

    return (
        <div className="text-xs sm:text-sm md:text-base">
            {allPosts?.map((post) => (
                <div key={post._id} className="border border-t-0 flex p-2 sm:p-3 md:p-4 items-center">
                    <Avatar className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10">
                        <AvatarImage src={post.imageUrl} alt="avatar" />
                        <AvatarFallback>Liit</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 flex flex-col justify-center items-start">
                        <div className="flex gap-x-1 justify-center items-center">
                            {/* TODO: set max characters for username? */}
                            <p className="text-muted-foreground">@{post.username}</p>
                            <p>·</p>
                            {/* TODO: Customize Day.js using UpdateLocale plugin for even shorter version, e.g. say "5s instead of 5 seconds, 12m instead of 12 minutes, 4h not 4 hours, etc." */}
                            <p className="text-xs">{dayjs(post._creationTime).fromNow(true)}</p>
                            <div>
                                {(post.authorId === userId)
                                    ?
                                    <DialogDelete postId={post._id}>
                                        <Button variant="ghost" size="sm" className="rounded-full">
                                            <Trash2 className="h-3 w-3 text-muted-foreground" />
                                        </Button>
                                    </DialogDelete>
                                    : <></>
                                }
                            </div>
                        </div>
                        <div className="text-left">
                            {post.text}
                        </div>
                    </div>
                    <div className="flex flex-1 justify-end items-center">
                        {/* TODO: Add counter to record totalLikes */}
                        {/* TODO: Add counter to Users table, increase when user likes any post */}
                        {(post.likes > 0)
                            ?
                            <>
                                <p className="ml-2">{post.likes}</p>
                                <Button variant="ghost" size="sm" onClick={() => handleEdit(post._id, post.likes)}>
                                    <Heart color="red" fill="red" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                                </Button>
                            </>
                            :
                            <>
                                <Button variant="ghost" size="sm" onClick={() => handleEdit(post._id, post.likes)}>
                                    <Heart className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                                </Button>
                            </>
                        }

                    </div>
                </div>
            ))}
        </div>
    );
}

export default ShowPosts;
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useUser } from "@clerk/nextjs";
import { useConvexAuth, useMutation } from "convex/react";
import { Heart, Trash2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DialogDelete } from "./dialog-delete";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { Post } from "../../../../../convex/posts";

dayjs.extend(relativeTime);

export function Posts(props: { posts: Post[] }) {

    const { isAuthenticated, isLoading } = useConvexAuth();
    const { user } = useUser();
    // console.log(`clerk user data`, user); // user.id here is the clerkUserId

    const likePost = useMutation(api.posts.like);
    const incrementCounter = useMutation(api.counters.increment);

    let posts = props.posts;

    if (!isAuthenticated && !isLoading) {
        let postsToDisplay = 5;

        // If too many posts found, return truncated version of allPosts
        if (props.posts.length > postsToDisplay) {
            posts = props.posts.slice(0, postsToDisplay);
        }
    }

    const handleLike = (postId: Id<"posts">, likes: number) => {
        likePost({ postId });
        incrementCounter({ name: "totalLikes" });
    }

    return (
        <div className="text-xs sm:text-sm md:text-base">
            {posts.map((post) => (
                <div key={post._id} className="border border-t-0 flex p-2 sm:p-3 md:p-4 items-center">
                    <Avatar className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10">
                        <AvatarImage src={post.author.imageUrl} alt="avatar" />
                        <AvatarFallback>Liit</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 flex flex-col justify-center items-start">
                        <div className="flex gap-x-1 justify-center items-center">
                            <p className="text-muted-foreground">@{post?.author.username}</p>
                            <p>·</p>
                            <p className="text-xs">{dayjs(post._creationTime).fromNow(true)}</p>
                            <div>
                                {(post?.author.clerkUserId === user?.id)
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
                        {(post.likes > 0)
                            ?
                            <>
                                <p className="ml-2">{post.likes}</p>
                                <Button variant="ghost" size="sm" onClick={() => handleLike(post._id, post.likes)}>
                                    <Heart color="red" fill="red" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                                </Button>
                            </>
                            :
                            <>
                                <Button variant="ghost" size="sm" onClick={() => handleLike(post._id, post.likes)}>
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
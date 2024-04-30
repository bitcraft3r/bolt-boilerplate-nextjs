import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useUser } from "@clerk/nextjs";
import { useConvexAuth, useMutation } from "convex/react";
import { Heart, Trash2 } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Post } from "@/convex/posts";
import AvatarFallbackLogo from "./avatar-fallback-logo";
import { DialogDelete } from "./dialog-delete";

dayjs.extend(relativeTime);

export function Posts(props: { posts: Post[] }) {

    const { isAuthenticated, isLoading } = useConvexAuth();
    const { user } = useUser();

    const likePost = useMutation(api.posts.like);

    const truncatedPosts = !isAuthenticated && !isLoading ? props.posts.slice(0, 5) : props.posts;

    const handleLike = (postId: Id<"posts">, likes: number) => {
        likePost({ postId });
    }

    const renderLikeButton = (post: Post) => {
        const likeCountElement = post.likes > 0 && <p className="mr-2">{post.likes}</p>;

        return (
            <Button variant="ghost" size="sm" onClick={() => handleLike(post._id, post.likes)}>
                {likeCountElement}
                <Heart
                    color={post.likes > 0 ? "red" : undefined}
                    fill={post.likes > 0 ? "red" : "none"}
                    className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
                />

            </Button>
        );
    };

    return (
        <div className="text-xs sm:text-sm md:text-base">
            {truncatedPosts.map((post) => (
                <div key={post._id} className="border border-t-0 flex p-2 sm:p-3 md:p-4 items-center">
                    {/* Author Avatar */}
                    <Link href={`/${post.author.username}`}>
                        <Avatar className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10">
                            <AvatarImage src={post.author.imageUrl} alt="avatar" />
                            <AvatarFallbackLogo />
                        </Avatar>
                    </Link>
                    {/* Post Content */}
                    <div className="ml-4 flex flex-col justify-center items-start">
                        <div className="flex gap-x-1 justify-center items-center">
                            <Link href={`/${post.author.username}`}>
                                <p className="text-muted-foreground">@{post?.author.username}</p>
                            </Link>
                            <p>·</p>
                            <Link href={`/post/${post._id}`}>
                                <p className="text-xs">{dayjs(post._creationTime).fromNow(true)}</p>
                            </Link>
                            {/* Delete Button */}
                            {post?.author.clerkUserId === user?.id &&
                                <DialogDelete postId={post._id}>
                                    <Button variant="ghost" size="sm" className="rounded-full">
                                        <Trash2 className="h-3 w-3 text-muted-foreground" />
                                    </Button>
                                </DialogDelete>
                            }
                        </div>
                        <div className="text-left">{post.text}</div>
                    </div>
                    {/* Like Button */}
                    <div className="flex flex-1 justify-end items-center">
                        {renderLikeButton(post)}
                    </div>
                </div>
            ))}
        </div>
    );
}

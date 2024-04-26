import { useMutation, useQuery } from "convex/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Heart, Trash2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useStoreUserEffect from "@/hooks/useStoreUserEffect";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

dayjs.extend(relativeTime);

const ShowPosts = () => {
    const userId = useStoreUserEffect();
    const allPosts = useQuery(api.posts.read);
    const deletePost = useMutation(api.posts.del);
    const editPost = useMutation(api.posts.update);

    const handleDelete = (postId: Id<"posts">) => {
        console.log(`handleDelete clicked`);
        deletePost({ id: postId });
    }

    const handleEdit = (postId: Id<"posts">, counter: number) => {
        editPost({ id: postId, counter });
    }

    // TODO: for every post, i want to fetch the user's data using the post.authorId. then use the post.author.username post.author.pictureUrl etc to populate the DOM. 

    return (
        <div className="">
            {allPosts?.map((post) => (
                <div key={post._id} className="border border-t-0 flex p-4 items-center">
                    <Avatar>
                        <AvatarImage src={post.pictureUrl} alt="avatar" />
                        <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 flex flex-col justify-center items-start">
                        <div className="flex gap-x-1 justify-center items-center">
                            <p className="font-bold">{post.name}</p>
                            <p className="text-muted-foreground">@{post.username}</p>
                            <p>·</p>
                            <p>{dayjs(post._creationTime).fromNow()}</p>
                            <div>
                                {(post.authorId === userId)
                                    ?
                                    <Button variant="ghost" size="sm" className="rounded-full" onClick={() => handleDelete(post._id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                    : <></>
                                }
                            </div>
                        </div>
                        <div className="text-left">
                            {post.text}
                        </div>
                    </div>
                    <div className="flex flex-1 justify-end items-center">
                        {(post.counter > 0)
                            ?
                            <>
                                <p>{post.counter}</p>
                                <Button variant="ghost" size="sm" onClick={() => handleEdit(post._id, post.counter)}>
                                    <Heart color="red" fill="red" />
                                </Button>
                            </>
                            :
                            <>
                                <Button variant="ghost" size="sm" onClick={() => handleEdit(post._id, post.counter)}>
                                    <Heart />
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
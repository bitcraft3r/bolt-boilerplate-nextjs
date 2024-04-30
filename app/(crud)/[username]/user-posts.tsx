"use client";

import { api } from "@/convex/_generated/api";
import { PostsScrollView } from "../_components/posts-scroll-view";

export function UserPosts({ username }: { username: string }) {
    return (
        <PostsScrollView
            query={api.posts.forAuthor}
            args={{ authorUserName: username }}
        />
    );
}
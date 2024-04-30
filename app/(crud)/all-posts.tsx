"use client";

import { api } from "@/convex/_generated/api";
import { PostsScrollView } from "./_components/posts-scroll-view";

export function AllPosts() {
    return <PostsScrollView query={api.posts.all} args={{}} />;
}
"use client";

import {
    PaginatedQueryArgs,
    PaginatedQueryReference,
    usePaginatedQuery,
} from "convex/react";
import { useEffect } from "react";

import { Posts } from "./posts";

export function PostsScrollView<Query extends PaginatedQueryReference>({
    query,
    args,
}: {
    query: Query;
    args: PaginatedQueryArgs<Query>;
}) {
    const {
        results: posts,
        status,
        loadMore,
    } = usePaginatedQuery(query, args, { initialNumItems: 5 });

    useEffect(() => {
        const handleScroll = () => {
            const page = document.documentElement;
            const closeToBottom =
                page.scrollHeight - page.scrollTop - page.clientHeight < 100;
            if (closeToBottom && status === "CanLoadMore") {
                loadMore(5);
            }
        };
        handleScroll();
        document.addEventListener("scroll", handleScroll);
        return () => document.removeEventListener("scroll", handleScroll);
    }, [status, loadMore]);

    return <Posts posts={posts} />;
}
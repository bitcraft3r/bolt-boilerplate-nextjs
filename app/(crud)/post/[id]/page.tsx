"use client";

import { ConvexHttpClient } from "convex/browser";

import { Posts } from "../../_components/posts";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { BackLink } from "../../_components/backlink";

export const dynamic = "force-dynamic";

export default async function Post({ params }: { params: { id: string } }) {

    const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    const post = await client.query(api.posts.get, {
        postId: params.id as Id<"posts">,
    });

    return (
        <>
            <BackLink />
            <div className="border border-t-2 rounded-sm mt-4">
                {
                    (post === null)
                        ? <></>
                        : <Posts posts={[post]} />
                }
            </div>
        </>
    );
}
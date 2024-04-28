import { asyncMap } from "modern-async";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

import { QueryCtx, mutation, query } from "./_generated/server";
import { Doc } from "./_generated/dataModel";
import { getUser } from "./users";

export const create = mutation({
    args: { text: v.string() },
    handler: async (ctx, { text }) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called createPost without authentication present");
        }

        const author = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier),
            )
            .unique();

        if (author === null) {
            throw new Error("User not found");
        }

        if (text.length <= 0 || text.length > 100) {
            throw new Error("Message is empty or too long");
        }

        if (author.numPosts === undefined) {
            await ctx.db.patch(author._id, { numPosts: 1 });
        } else {
            await ctx.db.patch(author._id, { numPosts: author.numPosts! + 1 });
        }

        const newPostId = await ctx.db
            .insert("posts", {
                authorId: author._id,
                text,
                likes: 0,
            });

        return newPostId;
    },
});

export const all = query({
    args: { paginationOpts: paginationOptsValidator },
    handler: async (ctx, args) => {
        const allPosts = await ctx.db
            .query("posts")
            .order("desc")
            .paginate(args.paginationOpts);

        return { ...allPosts, page: await enrichPosts(ctx, allPosts.page) };
    },
});

export const get = query({
    args: { postId: v.id("posts") },
    handler: async (ctx, args) => {
        const post = await ctx.db.get(args.postId);
        if (post === null) {
            return null;
        }
        return await enrichPost(ctx, post);
    },
});

export const forAuthor = query({
    args: {
        authorUserName: v.string(),
        paginationOpts: paginationOptsValidator,
    },
    handler: async (ctx, args) => {
        const author = await getUser(ctx, args.authorUserName);
        if (author === null) {
            return { page: [], isDone: true, continueCursor: "" };
        }
        const result = await ctx.db
            .query("posts")
            .withIndex("by_author", (q) => q.eq("authorId", author._id))
            .order("desc")
            .paginate(args.paginationOpts);

        return { ...result, page: await enrichPosts(ctx, result.page) };
    },
});

async function enrichPosts(ctx: QueryCtx, posts: Doc<"posts">[]) {
    return await asyncMap(posts, (post) => enrichPost(ctx, post));
}

async function enrichPost(ctx: QueryCtx, post: Doc<"posts">) {
    const author = await ctx.db.get(post.authorId);
    if (author === null) {
        return null;
    }
    return { ...post, author };
}

export type Post = NonNullable<Awaited<ReturnType<typeof enrichPost>>>;

export const like = mutation({
    args: { postId: v.id("posts") },
    handler: async (ctx, { postId }) => {
        const post = await ctx.db.get(postId);
        const updatedPost = await ctx.db.patch(postId, { likes: post?.likes! + 1 });

        const identity = await ctx.auth.getUserIdentity();

        if (identity) {
            const author = await ctx.db
                .query("users")
                .withIndex("by_token", (q) =>
                    q.eq("tokenIdentifier", identity.tokenIdentifier),
                )
                .unique();

            if (author === null) {
                throw new Error("User not found");
            }

            if (author.totalLiked === undefined) {
                await ctx.db.patch(author._id, { totalLiked: 1 });
            } else {
                await ctx.db.patch(author._id, { totalLiked: author.totalLiked! + 1 });
            }
        }

        return updatedPost;
    },
});

export const del = mutation({
    args: { postId: v.id("posts") },
    handler: async (ctx, { postId }) => {
        await ctx.db.delete(postId);
    },
});

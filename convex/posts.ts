import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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

        if (text.length <= 0 || text.length > 64) {
            throw new Error("Message is empty or too long");
        }

        const newPostId = await ctx.db
            .insert("posts", {
                authorId: author._id,
                text,
                counter: 0,
                // TODO: instead of adding the pictureUrl, username, and name of the author at time of creating post, is it possible to get all author data just with the authorId (so we dont have to save the user's data to every post)?
                pictureUrl: author.pictureUrl,
                username: author.username,
                name: author.name!,
            });

        return newPostId;
    },
});

export const read = query({
    args: {},
    handler: async (ctx, args) => {
        const allPosts = await ctx.db
            .query("posts")
            .order("desc")
            .collect();

        return allPosts;
    },
});

export const update = mutation({
    args: { id: v.id("posts"), counter: v.number() },
    handler: async (ctx, args) => {
        const { id, counter } = args;

        const updatedPost = await ctx.db.patch(id, { counter: counter + 1 });

        return updatedPost;
    },
});

export const del = mutation({
    args: { id: v.id("posts") },
    handler: async (ctx, { id }) => {
        await ctx.db.delete(id);
    },
});

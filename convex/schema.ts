import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        tokenIdentifier: v.string(),
        clerkUserId: v.string(),
        imageUrl: v.string(),
        email: v.string(), // set as required for use as primary contact information
        username: v.string(), // set as required for use as unique identifier in app
        wallet: v.optional(v.string()), // web3 wallet address
        numPosts: v.optional(v.number()),
        totalLiked: v.optional(v.number()),
    })
        .index("by_token", ["tokenIdentifier"])
        .index("username", ["username"]),
    posts: defineTable({
        authorId: v.id("users"),
        text: v.string(),
        likes: v.number(),
    }).index("by_author", ["authorId"]),
});
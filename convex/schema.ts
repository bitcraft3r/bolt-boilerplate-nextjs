import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        tokenIdentifier: v.string(),
        clerkUserId: v.string(),
        pictureUrl: v.string(),
        username: v.string(),
        email: v.string(),
        name: v.optional(v.string()),
        // totalLiked: v.optional(v.number()), // TODO: Add counter to Users table, increase when user likes any post
        // TODO: Clerk -> Create account with Metamask
        // TODO: Add web3Wallet field (optional)
        // TODO: Figure out Sign Up UX ; many fields required now to sign up ; smallest problem is even on google auth sign up user will need to enter Last name. // Every provider returns different fields in identity -> which should be the identifying field?
    }).index("by_token", ["tokenIdentifier"]),
    posts: defineTable({
        authorId: v.id("users"),
        pictureUrl: v.string(),
        username: v.string(),
        name: v.string(),
        text: v.string(),
        counter: v.number(),
    }).index("by_author", ["authorId"]),
    // TODO: Add counters table
    // counters: defineTable({
    //     github: v.number(),
    //     twitter: v.number(),
    //     share: v.number(),
    //     totalLikes: v.number(),
    // }),
});
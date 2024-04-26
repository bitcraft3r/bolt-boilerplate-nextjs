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
    }).index("by_token", ["tokenIdentifier"]),
    posts: defineTable({
        authorId: v.id("users"),
        pictureUrl: v.string(),
        username: v.string(),
        name: v.string(),
        text: v.string(),
        counter: v.number(),
    }).index("by_author", ["authorId"]),
});
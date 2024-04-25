import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        tokenIdentifier: v.string(),
        clerkUserId: v.string(),
        email: v.string(),
        name: v.optional(v.string()),
    }).index("by_token", ["tokenIdentifier"]),
});
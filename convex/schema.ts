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
        clickedShare: v.optional(v.number()),
        clickedGithub: v.optional(v.number()),
        clickedTwitter: v.optional(v.number()),
        clickedTelegram: v.optional(v.number()),

        /** NOTES: 
         * Clerk auth login provides following user data `identity` via ctx.auth.getUserIdentity(), used in convex folder:
         * - Github: email, nickname, name, givenName
         * - Google: email,           name, givenName, familyName
         * - Twitter v2:    nickname
         * => Called by e.g. identity.email
         * 
         * All identity objects also contain:
         * - tokenIdentifier
         * - subject (clerkUserId)
         * - pictureUrl
         * 
         * Data provided via {user} = useUser() hook imported from "@clerk/nextjs", called as e.g. user.imageUrl, used in app router components:
         * - fullName, firstName, lastName
         * - id (as clerk's user id)
         * - imageUrl 
         * - primaryEmailAddress.emailAddress
         * - primaryWeb3Wallet.web3Wallet
         * - username
         * 
         */

    })
        .index("by_token", ["tokenIdentifier"])
        .index("username", ["username"]),
    posts: defineTable({
        authorId: v.id("users"),
        text: v.string(),
        likes: v.number(),
    }).index("by_author", ["authorId"]),
    counters: defineTable({
        name: v.string(),
        count: v.number(),
    }).index("by_name", ["name"]),
});
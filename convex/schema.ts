import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        tokenIdentifier: v.string(),
        clerkUserId: v.string(),
        imageUrl: v.string(),
        email: v.string(), // set as required for use as primary contact information
        username: v.string(), // set as required for use as unique identifier in app

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

        // TODO: Add numPosts counter to user table
        // totalLiked: v.optional(v.number()), // TODO: Add like counter to Users table, increase when user likes any post

    }).index("by_token", ["tokenIdentifier"]),
    posts: defineTable({
        authorId: v.id("users"),
        text: v.string(),
        likes: v.number(),
        // TODO: fix hardcoded imageUrl, username.
        imageUrl: v.string(),
        username: v.string(),
    }).index("by_author", ["authorId"]),
    // TODO: Add counters table
    // counters: defineTable({
    //     github: v.number(),
    //     twitter: v.number(),
    //     share: v.number(),
    //     totalLikes: v.number(),
    // }),
});
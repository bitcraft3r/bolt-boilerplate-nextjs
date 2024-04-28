import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const increment = mutation({
    args: { name: v.string() },
    handler: async (ctx, args) => {

        const counter = await ctx.db
            .query("counters")
            .withIndex("by_name", (q) =>
                q.eq("name", args.name),
            )
            .first();

        if (!counter) {
            throw new Error("Counter not found");
        }

        const increment = await ctx.db.patch(counter?._id!, { count: counter?.count! + 1 })

        // Increment user-specific counters if user is authenticated
        const identity = await ctx.auth.getUserIdentity();

        if (identity) {
            const user = await ctx.db
                .query("users")
                .withIndex("by_token", (q) =>
                    q.eq("tokenIdentifier", identity.tokenIdentifier),
                )
                .unique();

            if (!user) {
                throw new Error("User not found");
            }

            let updateField;
            if (args.name === 'github') {
                updateField = 'clickedGithub';
            } else if (args.name === 'shareButton') {
                updateField = 'clickedShare';
            }

            if (updateField) {
                // @ts-ignore
                const newValue = (user[updateField] ?? 0) + 1;
                await ctx.db.patch(user._id, { [updateField]: newValue });
            }
        }

        return increment;
    }
})

export const initialize = mutation({
    args: {},
    handler: async (ctx) => {

        const tableRows = [
            // "twitter",
            // "telegram",
            // "discord",
            "github",
            "shareButton",
            "totalLikes"
        ]

        async function insertCounters() {
            for (const row of tableRows) {

                const existingCounter = await ctx.db
                    .query("counters")
                    .withIndex("by_name", (q) =>
                        q.eq("name", row)
                    )
                    .first();

                if (existingCounter) {
                    console.log(`Counter for ${row} already exists`);
                } else {
                    // If does not exist, insert the counter
                    const newCounter = await ctx.db.insert("counters", {
                        name: row,
                        count: 0,
                    });
                    console.log(`Counter for ${row} added`);
                }

            }
        }

        insertCounters();
    }
})


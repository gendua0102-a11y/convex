import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * This is a 'Query'. 
 * It is a read-only function that fetches data from the database.
 * Because it's a Convex query, the frontend will automatically
 * re-run this whenever the data in the 'greetings' table changes.
 */
export const get = query({
  args: {},
  handler: async (ctx) => {
    // Fetch all records from the "greetings" table
    return await ctx.db.query("greetings").collect();
  },
});

/**
 * This is a 'Mutation'.
 * Use this to change data (insert, update, delete).
 */
export const add = mutation({
  // 'args' defines the "shape" of the data the frontend must send
  args: { 
    body: v.string() 
  },
  handler: async (ctx, args) => {
    // Insert a new document into the "greetings" table
    const newGreetingId = await ctx.db.insert("greetings", { 
      body: args.body 
    });
    return newGreetingId;
  },
});
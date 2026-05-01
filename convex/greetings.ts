import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("greetings").collect();
  },
});

export const add = mutation({
  args: { 
    body: v.string(), 
    name: v.string() // Accept the name here
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("greetings", { 
      body: args.body, 
      name: args.name 
    });
  },
});
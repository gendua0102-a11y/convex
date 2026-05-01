import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  greetings: defineTable({
    body: v.string(),
    name: v.optional(v.string()), // Add this line
  }),
});

import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const CreateNewUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  },

  handler: async (ctx, args) => {
    // Check if the user already exists
    const existingUser = await ctx.db
      .query("UserTable")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();

    if (existingUser) {
      return existingUser;
    }

    // Create a new user
    const userId = await ctx.db.insert("UserTable", {
      name: args.name,
      email: args.email,
      imageUrl: args.imageUrl,
    });

    return await ctx.db.get(userId);
  },
});
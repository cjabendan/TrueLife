import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";

// Create User Function

export const createUser = mutation({
  args: {
    username: v.string(),
    fullname: v.string(),
    image: v.string(),
    email: v.string(),
    bio: v.optional(v.string()),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    // await ctx.auth.getUserIdentity();

    if (existingUser) return;

    // create user in Convex db

    await ctx.db.insert("users", {
      username: args.username,
      fullname: args.fullname,
      image: args.image,
      email: args.email,
      bio: args.bio,
      clerkId: args.clerkId,
      followers: 0,
      following: 0,
      posts: 0,
    });
  },
});

export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    return user;
  },
});

export const updatePfofile = mutation({
  args: {
    fullname: v.string(),
    bio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx);

    await ctx.db.patch(currentUser._id, {
      fullname: args.fullname,
      bio: args.bio,
    });
  },
});

export const getFollowingUsers = query({
  args: {},
  handler: async (ctx) => {
    const currentUser = await getAuthenticatedUser(ctx);

    // Get all follows where you are the follower
    const follows = await ctx.db
      .query("follows")
      .withIndex("by_follower", (q) => q.eq("followerId", currentUser._id))
      .collect();

    const followingIds = follows.map((f) => f.followingId);

    if (followingIds.length === 0) return [];

    // Get user info for each followingId
    const users = await Promise.all(followingIds.map((id) => ctx.db.get(id)));

    // Filter out nulls (in case of deleted users)
    return users.filter(Boolean);
  },
});

export const getUserProfile = query({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.id);
    if (!user) throw new Error("User does not exist!");

    return user;
  },
});

export const isFollowing = query({
  args: { followingId: v.id("users") },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx);

    const follow = await ctx.db
      .query("follows")
      .withIndex("by_both", (q) =>
        q.eq("followerId", currentUser._id).eq("followingId", args.followingId)
      )
      .first();

    return !!follow;
  },
});

export const toggleFollow = mutation({
  args: { followingId: v.id("users") },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx);

    const existing = await ctx.db
      .query("follows")
      .withIndex("by_both", (q) =>
        q.eq("followerId", currentUser._id).eq("followingId", args.followingId)
      )
      .first();

      if(existing) {
        // unfollow
        await ctx.db.delete(existing._id);
        await updateFollowCounts(ctx,currentUser._id, args.followingId, false);
      }else{
        //follow
        await ctx.db.insert("follows", {
            followerId: currentUser._id,
            followingId: args.followingId,
        })
         await updateFollowCounts(ctx,currentUser._id, args.followingId, true);

         // create a notification
         await ctx.db.insert("notifications", {
            receiverId: args.followingId,
            senderId: currentUser._id,
            type: "follow",
         });
      }
  },
});

async function updateFollowCounts (
    ctx: MutationCtx,
    followerId: Id<"users">,
    followingId: Id<"users">,
    isFollow: boolean
){
    const follower = await ctx.db.get(followerId);
    const following = await ctx.db.get(followingId);

    if (follower && following) {
        // Update current user's following count
        await ctx.db.patch(followerId, {
            following: follower.following + (isFollow ? 1 : -1),
        });
        // Update target user's followers count (FIXED)
        await ctx.db.patch(followingId, {
            followers: following.followers + (isFollow ? 1 : -1),
        });
    }
}

// Helper Function

export async function getAuthenticatedUser(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Unauthorized");

  const currentUser = await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
    .first();

  if (!currentUser) throw new Error("User not found");

  return currentUser;
}

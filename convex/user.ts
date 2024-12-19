import { getAuthUserId } from '@convex-dev/auth/server';
import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    return await ctx.db.get(userId);
  },
});

export const getUser = query({
  args: { id: v.id('users') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const deleteUser = mutation({
  async handler(ctx) {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error('Not authenticated');
    }
    const account = await ctx.db
      .query('authAccounts')
      .filter((q) => q.eq(q.field('userId'), userId))
      .first();
    if (account === null) {
      throw new Error('Account not found');
    }
    return Promise.all([await ctx.db.delete(account._id), await ctx.db.delete(userId)]);
  },
});

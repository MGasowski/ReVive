import { getAuthUserId } from '@convex-dev/auth/server';
import { v } from 'convex/values';

import { mutation, query } from './_generated/server';

export const add = mutation({
  args: {
    text: v.string(),
    itemId: v.id('items'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authenticated');
    }
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error('User not found');
    }

    const comment = await ctx.db.insert('comments', {
      text: args.text,
      itemId: args.itemId,
      userId,
      createdAt: Date.now(),
    });

    return comment;
  },
});

export const list = query({
  args: { itemId: v.id('items') },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query('comments')
      .withIndex('by_item', (q) => q.eq('itemId', args.itemId))
      .order('asc')
      .collect();

    // Fetch user information for each comment
    const users = await Promise.all(
      comments.map((comment) =>
        ctx.db
          .query('users')
          .filter((q) => q.eq(q.field('_id'), comment.userId))
          .unique()
      )
    );

    return comments.map((comment, index) => ({
      ...comment,
      user: users[index],
    }));
  },
});

import { getAuthUserId } from '@convex-dev/auth/server';
import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const myChats = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error('User not found');
    }

    const chats = await ctx.db
      .query('chats')
      .filter((q) => q.or(q.eq(q.field('user'), userId), q.eq(q.field('itemOwner'), userId)))
      .collect();

    return Promise.all(
      chats.map(async (chat) => {
        let url = '';
        const item = await ctx.db.get(chat.item);
        if (item?.format === 'image') {
          url = (await ctx.storage.getUrl(item.body)) ?? '';
        }
        const lastMessage = await ctx.db
          .query('chatMessages')
          .filter((q) => q.eq(q.field('chat'), chat._id))
          .order('desc')
          .first();
        const user = await ctx.db.get(chat.user);
        const itemOwner = await ctx.db.get(chat.itemOwner);
        return { ...chat, item, user, itemOwner, url, lastMessage };
      })
    );
  },
});

export const addMessage = mutation({
  args: {
    text: v.string(),
    chatId: v.id('chats'),
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

    const chatMessage = await ctx.db.insert('chatMessages', {
      text: args.text,
      chat: args.chatId,
      user: userId,
      createdAt: Date.now(),
    });

    return chatMessage;
  },
});

export const listMessages = query({
  args: { chatId: v.id('chats') },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query('chatMessages')
      .withIndex('by_chat', (q) => q.eq('chat', args.chatId))
      .order('asc')
      .collect();

    // Fetch user information for each comment
    const users = await Promise.all(
      comments.map((comment) =>
        ctx.db
          .query('users')
          .filter((q) => q.eq(q.field('_id'), comment.user))
          .unique()
      )
    );

    return comments.map((comment, index) => ({
      ...comment,
      user: users[index],
    }));
  },
});

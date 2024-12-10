import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const sendImage = mutation({
  args: {
    storageId: v.id('_storage'),
    name: v.string(),
    description: v.string(),
    reservable: v.boolean(),
    location: v.object({
      lat: v.number(),
      lng: v.number(),
    }),
  },

  handler: async (ctx, args) => {
    const author = await getAuthUserId(ctx);
    await ctx.db.insert('items', {
      body: args.storageId,
      reservable: args.reservable,
      status: 'available',
      name: args.name,
      author: author!,
      description: args.description,
      location: args.location,
      format: 'image',
    });
  },
});

export const getMessages = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('items').collect();
  },
});

export const getItem = query({
  args: { id: v.id('items') },
  handler: async (ctx, args) => {
    // inflate item image url
    const item = await ctx.db.get(args.id);
    return {
      ...item,
      url: item?.format === 'image' ? await ctx.storage.getUrl(item.body) : null,
    };
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const author = await getAuthUserId(ctx);
    const messages = await ctx.db
      .query('items')
      // .filter((q) => q.neq(q.field('author'), author))
      .collect();
    return Promise.all(
      messages.map(async (message) => ({
        ...message,
        // If the message is an "image" its `body` is an `Id<"_storage">`
        ...(message.format === 'image' ? { url: await ctx.storage.getUrl(message.body) } : {}),
      }))
    );
  },
});

export const myList = query({
  args: {},
  handler: async (ctx) => {
    const author = await getAuthUserId(ctx);
    const messages = await ctx.db
      .query('items')
      .filter((q) => q.eq(q.field('author'), author))
      .collect();
    return Promise.all(
      messages.map(async (message) => ({
        ...message,
        // If the message is an "image" its `body` is an `Id<"_storage">`
        ...(message.format === 'image' ? { url: await ctx.storage.getUrl(message.body) } : {}),
      }))
    );
  },
});

export const reserve = mutation({
  args: { id: v.id('items') },
  handler: async (ctx, args) => {
    const author = await getAuthUserId(ctx);
    await ctx.db.patch(args.id, { status: 'reserved', reservedBy: author! });
  },
});

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
      deleted: false,
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
  args: {
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Step 1: Get all items or filtered items based on search query
    const items = await ctx.db
      .query('items')
      .filter((q) => q.eq(q.field('deleted'), false))
      .collect();

    const filteredItems = await ctx.db
      .query('items')
      .withSearchIndex('search_name', (q) => q.search('name', args.search!))
      .filter((q) => q.neq(q.field('deleted'), true))
      .collect();

    const result = await Promise.all(
      (args.search ? filteredItems : items).map(async (item) => {
        // Step 2: Fetch the author object using the ID in the message
        let authorData = null;

        if (item.author) {
          authorData = await ctx.db.get(item.author); // Fetch the author by ID
        }

        // Step 3: Handle "image" format URLs and include the author data
        return {
          ...item,
          ...(item.format === 'image' ? { url: await ctx.storage.getUrl(item.body) } : {}),
          author: authorData, // Attach the author object to the message
        };
      })
    );

    return result;
  },
});

export const myList = query({
  args: {
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const author = await getAuthUserId(ctx);
    const messages = await ctx.db
      .query('items')
      .filter((q) => q.eq(q.field('author'), author))
      .collect();

    const filteredMessages = await ctx.db
      .query('items')
      .withSearchIndex('search_name', (q) => q.search('name', args.search!))
      .filter((q) => q.eq(q.field('author'), author))
      .collect();

    return Promise.all(
      (args.search ? filteredMessages : messages).map(async (message) => ({
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
    const item = await ctx.db.get(args.id);
    if (!author || !item) {
      return;
    }
    await ctx.db.patch(args.id, { status: 'reserved', reservedBy: author! });
    const chatId = await ctx.db.insert('chats', {
      item: item._id,
      user: author,
      itemOwner: item.author,
    });
    return chatId;
  },
});

export const cancelReservation = mutation({
  args: { id: v.id('items') },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: 'available', reservedBy: undefined });
  },
});

export const makeUnavailable = mutation({
  args: { id: v.id('items') },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: 'unavailable' });
  },
});

export const makeAvailable = mutation({
  args: { id: v.id('items') },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: 'available' });
  },
});

export const deleteItem = mutation({
  args: { id: v.id('items') },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { deleted: true });
  },
});

import { defineSchema, defineTable } from 'convex/server';
import { authTables } from '@convex-dev/auth/server';
import { v } from 'convex/values';

const schema = defineSchema({
  ...authTables,
  items: defineTable({
    author: v.id('users'),
    name: v.string(),
    description: v.optional(v.string()),
    body: v.id('_storage'),
    format: v.string(),
    reservable: v.boolean(),
    reservedBy: v.optional(v.id('users')),
    status: v.union(v.literal('available'), v.literal('reserved'), v.literal('unavailable')),
    deleted: v.boolean(),
    location: v.optional(
      v.object({
        lat: v.number(),
        lng: v.number(),
      })
    ),
  }).searchIndex('search_name', {
    searchField: 'name',
    filterFields: ['name'],
  }),
  comments: defineTable({
    text: v.string(),
    itemId: v.id('items'),
    userId: v.id('users'),
    createdAt: v.number(),
  })
    .index('by_item', ['itemId'])
    .index('by_user', ['userId']),
});

export default schema;

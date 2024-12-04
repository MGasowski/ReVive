import { defineSchema, defineTable } from 'convex/server';
import { authTables } from '@convex-dev/auth/server';
import { v } from 'convex/values';

const schema = defineSchema({
  ...authTables,
  items: defineTable({
    author: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    body: v.id('_storage'),
    format: v.string(),
    location: v.optional(
      v.object({
        lat: v.number(),
        lng: v.number(),
      })
    ),
  }),
});

export default schema;

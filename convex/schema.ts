import { defineSchema, defineTable } from 'convex/server';
import { authTables } from '@convex-dev/auth/server';
import { v } from 'convex/values';

const schema = defineSchema({
  ...authTables,
  messages: defineTable({
    author: v.string(),
    body: v.id('_storage'),
    format: v.string(),
  }),
});

export default schema;

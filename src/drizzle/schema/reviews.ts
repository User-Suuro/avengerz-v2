import { mysqlTable, varchar, timestamp, int, text } from 'drizzle-orm/mysql-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { users } from './users';

export const reviews = mysqlTable('reviews', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  rating: int('rating').notNull(),
  userId: varchar('user_id', { length: 255 }).notNull().references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

// Schemas with validation
export const insertReviewSchema = createInsertSchema(reviews);
export const selectReviewSchema = createSelectSchema(reviews);

// Form validation schema
export const reviewFormSchema = z.object({
  title: z.string().min(3).max(255),
  content: z.string().min(10),
  rating: z.number().int().min(1).max(5),
});

export type ReviewFormData = z.infer<typeof reviewFormSchema>;
export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;

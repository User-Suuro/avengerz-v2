import {
  mysqlTable,
  varchar,
  boolean,
  timestamp,
  longtext,
  int,
  foreignKey,
} from "drizzle-orm/mysql-core";

// -- Sessions Table -- //

export const sessions = mysqlTable("sessions", {
  id: int("id").autoincrement().primaryKey(),
  sessionToken: varchar("session_token", { length: 255 }).notNull(),
  otp: varchar("otp", { length: 6 }).notNull(),
  sessionRefreshedDate: timestamp("session_refreshed_date").notNull().defaultNow(),
  sessionValidityDate: timestamp("session_validity_date").notNull(),
});

// -- Users Table -- //

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  password: longtext("password").notNull(),
  verified: boolean("verified").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  session: int("session_key").references(() => sessions.id, {onDelete: "set null"}),
});

// -- Admins Table -- //

export const admins = mysqlTable("admins", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  password: longtext("password").notNull(),
  session: int("session_key").references(() => sessions.id, {onDelete: "set null"}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),

  // Self-reference: admins.created_by -> admins.id
  createdBy: int("created_by"),
}, (table) => ({
  createdByFk: foreignKey({
    columns: [table.createdBy],
    foreignColumns: [table.id], 
    name: "fk_admins_created_by",
  }).onDelete("set null"),
}));

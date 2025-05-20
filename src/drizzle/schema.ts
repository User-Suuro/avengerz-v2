import {
  mysqlTable,
  varchar,
  boolean,
  mysqlEnum,
  timestamp,
  serial,
  longtext,
  int,
  foreignKey,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  password: longtext("password").notNull(),
  token: longtext("token").notNull(),
  position: mysqlEnum("position", ["ADMIN", "USER"]).notNull().default("USER"),
  verified: boolean("verified").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),

  // Self-referencing foreign key
  createdBy: int("created_by"),
}, (table) => ({
  createdByFk: foreignKey({
    columns: [table.createdBy],
    foreignColumns: [table.id],
    name: "fk_users_created_by",
  }).onDelete("set null"),
}));

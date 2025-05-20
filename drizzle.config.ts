// @ts-nocheck
import "@/lib/env";
import { defineConfig } from "drizzle-kit"

export default defineConfig({
  dialect:"mysql",
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/migrations",
  dbCredentials: {
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
  },
  verbose:true,
  strict:true,
});
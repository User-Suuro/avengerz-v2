import { NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema/users";

export async function GET() {
  try {
    const allUsers = await db.select().from(users);
    console.log('All users in database:', JSON.stringify(allUsers, null, 2));
    return NextResponse.json(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
} 
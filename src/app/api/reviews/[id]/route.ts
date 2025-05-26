import { NextRequest, NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { reviews } from "@/drizzle/schema/reviews";
import { eq } from "drizzle-orm";
import { users } from "@/drizzle/schema/users";

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const id = parseInt(context.params.id);
    const body = await request.json();

    await db
      .update(reviews)
      .set(body)
      .where(eq(reviews.id, id));

    return NextResponse.json({ message: "Review updated successfully" });
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json(
      { error: "Failed to update review" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  context: { params: { id: string } }
) {
  try {
    const id = parseInt(context.params.id);

    await db
      .delete(reviews)
      .where(eq(reviews.id, id));

    return NextResponse.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
}

export async function GET(
  context: { params: { id: string } }
) {
  try {
    const id = parseInt(context.params.id);
    const review = await db
      .select({
        id: reviews.id,
        title: reviews.title,
        content: reviews.content,
        rating: reviews.rating,
        userId: reviews.userId,
        createdAt: reviews.createdAt,
        updatedAt: reviews.updatedAt,
        user: {
          name: users.name,
          email: users.email,
        },
      })
      .from(reviews)
      .leftJoin(users, eq(reviews.userId, users.id))
      .where(eq(reviews.id, id))
      .then((res) => res[0]);

    if (!review) {
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(review);
  } catch (error) {
    console.error("Error fetching review:", error);
    return NextResponse.json(
      { error: "Failed to fetch review" },
      { status: 500 }
    );
  }
} 
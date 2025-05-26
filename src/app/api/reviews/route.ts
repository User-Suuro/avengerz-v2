import { NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { reviews } from "@/drizzle/schema/reviews";
import { users } from "@/drizzle/schema/users";
import { desc, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    console.log('Attempting to create review with data:', body);

    // Validate required fields
    if (!body.title || !body.content || !body.rating) {
      console.error('Missing required fields:', body);
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await db.insert(reviews).values({
      title: body.title,
      content: body.content,
      rating: Number(body.rating),
      userId: session.user.id,
    });

    console.log('Review created successfully:', result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating review:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message, error.stack);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const allReviews = await db
      .select({
        id: reviews.id,
        title: reviews.title,
        content: reviews.content,
        rating: reviews.rating,
        userId: reviews.userId,
        createdAt: reviews.createdAt,
        updatedAt: reviews.updatedAt,
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
        },
      })
      .from(reviews)
      .innerJoin(users, eq(reviews.userId, users.id))
      .orderBy(desc(reviews.createdAt));

    console.log('Reviews with user data:', JSON.stringify(allReviews, null, 2));

    // Map the results to ensure user data is properly structured
    const formattedReviews = allReviews.map(review => ({
      ...review,
      user: {
        name: review.user.name,
        email: review.user.email,
      }
    }));

    return NextResponse.json(formattedReviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
} 
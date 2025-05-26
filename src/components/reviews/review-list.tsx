"use client";

import { useEffect, useState, forwardRef, useImperativeHandle, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/shadcn/ui/card";
import { Button } from "@/shadcn/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import type { Review } from "@/drizzle/schema/reviews";
import { ReviewEditDialog } from "./review-edit-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog";

interface ReviewWithUser extends Review {
  user?: {
    name?: string | null;
    email?: string | null;
  } | null;
}

export const ReviewList = forwardRef<{ fetchReviews: () => void }>((props, ref) => {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<ReviewWithUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const fetchReviews = useCallback(async () => {
    try {
      const response = await fetch("/api/reviews");
      if (!response.ok) throw new Error("Failed to fetch reviews");
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useImperativeHandle(ref, () => ({
    fetchReviews
  }), [fetchReviews]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete review");
      await fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
  };

  const handleEditComplete = () => {
    setEditingReview(null);
    fetchReviews();
  };

  const canModifyReview = (review: ReviewWithUser) => {
    return session?.user?.id === review.userId;
  };

  if (isLoading) {
    return <div>Loading reviews...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      {reviews.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            No reviews yet. Be the first to write one!
          </CardContent>
        </Card>
      ) : (
        reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <CardTitle>{review.title}</CardTitle>
              <div className="text-sm text-muted-foreground">
                Rating: {review.rating}/5
              </div>
            </CardHeader>
            <CardContent>
              <p>{review.content}</p>
              <div className="text-sm text-muted-foreground mt-2">
                By: {review.user?.name || review.user?.email || 'Anonymous'}
                <br />
                Posted on: {new Date(review.createdAt).toLocaleDateString()}
              </div>
            </CardContent>
            {canModifyReview(review) && (
              <CardFooter className="gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(review)}
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Review</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this review? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(review.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            )}
          </Card>
        ))
      )}
      {editingReview && (
        <ReviewEditDialog
          review={editingReview}
          onClose={() => setEditingReview(null)}
          onComplete={handleEditComplete}
        />
      )}
    </div>
  );
});

ReviewList.displayName = 'ReviewList'; 
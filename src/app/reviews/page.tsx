"use client";

import { redirect } from "next/navigation";
import { ReviewForm } from "@/components/reviews/review-form";
import { ReviewList } from "@/components/reviews/review-list";
import { useRef } from "react";
import { useSession } from "next-auth/react";

export default function ReviewsPage() {
  useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/signin");
    },
  });

  const reviewListRef = useRef<{ fetchReviews: () => void }>(null);

  const handleReviewSuccess = () => {
    reviewListRef.current?.fetchReviews();
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <ReviewForm onSuccess={handleReviewSuccess} />
      <ReviewList ref={reviewListRef} />
    </div>
  );
} 
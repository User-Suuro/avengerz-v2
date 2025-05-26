"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/shadcn/ui/button";

export function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return (
      <Button variant="outline" asChild>
        <a href="/auth/signin">Sign In</a>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <span>Signed in as {session?.user?.email}</span>
      <Button variant="outline" onClick={() => signOut()}>
        Sign Out
      </Button>
    </div>
  );
} 
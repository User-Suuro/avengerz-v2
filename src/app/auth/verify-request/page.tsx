import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/ui/card";

export default function VerifyRequest() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Check your email</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            A sign in link has been sent to your email address. Please check your
            inbox and click the link to sign in.
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 
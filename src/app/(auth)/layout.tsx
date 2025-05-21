// app/(auth)/layout.tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-layout">
      {/* Maybe a different navbar or no navbar */}
      {children}
    </div>
  );
}

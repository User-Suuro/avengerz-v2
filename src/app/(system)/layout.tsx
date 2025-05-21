// app/(system)/layout.tsx

export default async function SystemLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="system-layout">
      {children}
    </div>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/ui/Navigation";

export const metadata: Metadata = {
  title: "French Refresh - Return to Fluency",
  description: "AI-powered French language learning for advanced learners returning to the language",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navigation />
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </body>
    </html>
  );
}

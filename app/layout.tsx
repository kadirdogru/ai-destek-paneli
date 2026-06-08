import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "AI Destek Paneli",
  description: "PRD §4 — Modern Dark Mode müşteri destek dashboard'u",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="flex h-screen overflow-hidden" style={{ background: "var(--bg)" }} suppressHydrationWarning>
        <Sidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}

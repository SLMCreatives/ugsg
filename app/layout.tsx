import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "First Steps at UNITAR",
  description: "UNITAR Orientation Starter Guide for new students."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}

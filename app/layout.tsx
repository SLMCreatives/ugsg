import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UNITAR Get Started Guide",
  description: "UNITAR Orientation Starter Guide for new students."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

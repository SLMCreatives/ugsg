import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

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
      <GoogleAnalytics gaId="G-2ZKP650KG1" />{" "}
    </html>
  );
}

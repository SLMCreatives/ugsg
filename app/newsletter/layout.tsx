import type { Metadata } from "next";
import "./newsletter.css";

export const metadata: Metadata = {
  title: "Student Newsletter 2026 | UNITAR",
  description:
    "The UNITAR Student Experience Department's annual newsletter — what changed at each campus after the September 2025 Student Satisfaction Survey."
};

export default function NewsletterLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <div className="newsletter-page">{children}</div>;
}

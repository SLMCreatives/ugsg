import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--bk-font-body",
  display: "swap"
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--bk-font-display",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Bangkit Series: 2026 Recap, 2027 Reset",
  description:
    "Help the Student Success Team shape an online sharing session for UG students — 8 questions, about 3–5 minutes."
};

export default function BangkitLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${dmSans.variable} ${manrope.variable}`}>{children}</div>;
}

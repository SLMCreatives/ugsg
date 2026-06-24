import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Onboarding Survey",
  description:
    "UNITAR Student Onboarding Survey — a 5-minute mid-semester check-in for new undergraduate and postgraduate students."
};

export default function SurveyLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

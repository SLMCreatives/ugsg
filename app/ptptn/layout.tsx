import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PTPTN Loan Application Guide",
  description:
    "Step-by-step guide to help you secure your PTPTN loan with confidence. From eligibility to booking your free 1-to-1 application session, we cover it all!"
};

export default function PTPTNLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}

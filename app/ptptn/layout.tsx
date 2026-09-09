import { Metadata } from "next";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

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
  return (
    <div className="flex min-h-screen flex-col bg-sand-50 font-sans text-sand-900">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

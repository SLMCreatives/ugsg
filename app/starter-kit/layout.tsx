import { Metadata } from "next";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

export const metadata: Metadata = {
  title: "Get your Starter Kit",
  description:
    "Claim your free starter kit to kickstart your online learning journey with us! Our starter kit includes essential items to help you succeed in your studies, including a branded t-shirt, a notebook, and a pen. Register now to secure your kit and be ready for an amazing learning experience!"
};

export default function StarterKitLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-sand-50 font-sans text-sand-900">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter note="For registered students only. Starter kit subject to availability." />
    </div>
  );
}

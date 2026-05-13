import { Metadata } from "next";
import Header from "@/components/kits/Header";
import Footer from "@/components/kits/Footer";

export const metadata: Metadata = {
  title: "Get your Starter Kit",
  description:
    "Claim your free starter kit to kickstart your online learning journey with us! Our starter kit includes essential items to help you succeed in your studies, including a branded t-shirt, a notebook, and a pen. Register now to secure your kit and be ready for an amazing learning experience!"
};

export default function PTPTNLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b1628]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

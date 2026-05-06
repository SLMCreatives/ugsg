import { Metadata } from "next";

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
  return <section>{children}</section>;
}

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function PTPTNLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}

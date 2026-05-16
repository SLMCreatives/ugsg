"use client";

import { BookingSection } from "@/components/booking-section";
import { HeroSection } from "@/components/hero-section";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-50 w-full mx-auto border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-8 mx-auto">
          <div className="flex items-center">
            <Link href="/ptptn">
              <Image
                src="/logo_unitar.png"
                width={40}
                height={40}
                alt="UNITAR Logo"
                className="w-36 h-24 rounded-full object-cover -ml-4"
              />
            </Link>
            <span className="hidden font-bold sr-only sm:inline-block">
              UNITAR International University
            </span>
            <p>PTPTN Application Help</p>
          </div>
          <nav className="flex flex-1 items-center justify-end space-x-4">
            <Link href="/ptptn">
              <Button size="sm" variant="ghost" className="p-0 font-bold">
                <Image
                  src="/mal.png"
                  width={20}
                  height={20}
                  alt="Malay"
                  className="w-auto max-h-6"
                />
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <HeroSection />
      <BookingSection isUnlocked={true} />

      {/* Footer */}
      <footer className="py-8 px-4 text-center border-t border-border">
        <p className="text-sm text-muted-foreground">
          A initiative by Student Success Team @ UNITAR International
          University. For any inquiries, please contact us at{" "}
          <Link href="mailto:sst@unitar.my" className="underline">
            sst@unitar.my
          </Link>
          .
        </p>
      </footer>
    </main>
  );
}

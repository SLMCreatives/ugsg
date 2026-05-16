"use client";

import { BookingSectionBM } from "@/components/booking-section-bm";
import { HeroSectionBM } from "@/components/hero-section-bm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function PTPTNPageBM() {
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
              University Antarabangsa UNITAR
            </span>
            <p>Bantuan Aplikasi PTPTN</p>
          </div>
          <nav className="flex flex-1 items-center justify-end space-x-4">
            <Link href="/ptptn/eng">
              <Button size="sm" variant="ghost" className="p-0 font-bold">
                <Image
                  src="/eng.png"
                  width={20}
                  height={20}
                  alt="English"
                  className="w-auto max-h-6"
                />
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <HeroSectionBM />
      <BookingSectionBM isUnlocked={true} />

      {/* Footer */}
      <footer className="py-8 px-4 text-center border-t border-border">
        <p className="text-sm text-muted-foreground">
          Satu inisiatif oleh Student Success Team @ UNITAR International
          University. Untuk sebarang pertanyaan, sila hubungi kami di{" "}
          <Link href="mailto:sst@unitar.my" className="underline">
            sst@unitar.my
          </Link>
          .
        </p>
      </footer>
    </main>
  );
}

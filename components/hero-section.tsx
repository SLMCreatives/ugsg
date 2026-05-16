"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToChecklist = () => {
    document
      .getElementById("booking")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 text-center bg-gradient-to-b from-blue-200 via-[#e5f5ff] to-white dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-accent mb-8">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-sm font-medium text-primary text-balance">
            Bookings Closed
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight tracking-tight text-balance mb-6">
          The Booking Period Has Ended
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          We are no longer accepting new bookings at this time. If you need help with your PTPTN application, please contact your SST Advisor or email us.
        </p>

        <Button
          onClick={scrollToChecklist}
          size="lg"
          className="rounded-full px-8 py-6 text-base gap-2 group"
        >
          Contact Us
          <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
}

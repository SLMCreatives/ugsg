"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToChecklist = () => {
    document.getElementById("eligibility")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-8">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-sm font-medium">Trusted by thousands of students</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight tracking-tight text-balance mb-6">
          Secure Your PTPTN Loan with Expert Guidance
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          {"We've helped thousands of students get their study loans approved. Complete the checklist below to book your free 1-to-1 Step-by-Step Application Session."}
        </p>
        
        <Button 
          onClick={scrollToChecklist}
          size="lg"
          className="rounded-full px-8 py-6 text-base gap-2 group"
        >
          Scroll to Checklist
          <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
}

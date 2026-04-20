"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSectionBM() {
  const scrollToChecklist = () => {
    document
      .getElementById("eligibility")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 text-center bg-gradient-to-b from-blue-200 via-[#e5f5ff] to-white dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-accent mb-8">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-medium text-primary text-balance">
            Pendaftaran Dibuka Sekarang!
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight tracking-tight text-balance mb-6">
          Pastikan Aplikasi PTPTN Anda Berjaya dengan Bimbingan Pakar
        </h1>

        <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          {
            "Kami telah berjaya membantu ramai pelajar dapatkan kelulusan pinjaman pelajaran mereka. Lengkapkan senarai panduan di bawah untuk menempah sesi bimbingan untuk permohonan PTPTN secara percuma!"
          }
        </p>

        <Button
          onClick={scrollToChecklist}
          size="lg"
          className="rounded-full px-8 py-6 text-base gap-2 group"
        >
          Skrol ke Senarai Semak
          <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
}

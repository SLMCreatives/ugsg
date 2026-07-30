"use client";

import { ChevronDown, CalendarCheck } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "1000+", label: "Pelajar dibantu" },
  { value: "30 min", label: "Sesi 1-ke-1" },
  { value: "Percuma", label: "Tanpa sebarang kos" }
];

export function HeroSectionBM() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[88vh] flex flex-col items-center justify-center px-4 py-20 text-center overflow-hidden">
      <Image
        src="/ptptn/hero-students.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Scrim to keep the headline readable over the photo */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/70 to-slate-950/90" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm font-medium text-white text-balance">
            Pendaftaran Dibuka Sekarang!
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight tracking-tight text-balance mb-6">
          Pastikan Permohonan PTPTN Anda Berjaya dengan Bimbingan Pakar
        </h1>

        <p className="text-base md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed text-balance">
          {
            "Kami telah berjaya membantu ramai pelajar dapatkan kelulusan pinjaman pelajaran mereka. Tempah sesi bimbingan permohonan PTPTN secara percuma dan hantar permohonan anda tanpa kesilapan."
          }
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={() => scrollTo("booking")}
            size="lg"
            className="rounded-full px-8 py-6 text-base gap-2 w-full sm:w-auto"
          >
            <CalendarCheck className="w-4 h-4" />
            Tempah Slot Anda
          </Button>
          <Button
            onClick={() => scrollTo("session")}
            size="lg"
            variant="outline"
            className="rounded-full px-8 py-6 text-base gap-2 group w-full sm:w-auto bg-white/10 border-white/30 text-white backdrop-blur hover:bg-white/20 hover:text-white"
          >
            Apa Yang Berlaku Semasa Sesi
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </Button>
        </div>

        <dl className="mt-14 grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="px-3 py-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-xl md:text-2xl font-semibold text-white">
                  {stat.value}
                </span>
                <span className="block text-xs md:text-sm text-white/70 mt-1 text-balance">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

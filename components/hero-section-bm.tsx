"use client";

import { ChevronDown, CalendarCheck } from "lucide-react";
import Image from "next/image";

const stats = [
  { value: "1000+", label: "Pelajar dibantu" },
  { value: "30 min", label: "Sesi 1-ke-1" },
  { value: "Percuma", label: "Tanpa sebarang kos" }
];

export function HeroSectionBM() {
  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section className="px-5 pt-3 lg:px-10 lg:pt-4">
      <div className="mx-auto max-w-6xl">
        <div className="grid overflow-hidden rounded-[22px] bg-sand-100 sm:rounded-[30px] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col gap-5 p-6 sm:gap-6 sm:p-12">
            <span className="flex items-center gap-2 self-start rounded-full bg-done-tint px-3.5 py-1.5">
              <span className="h-2 w-2 rounded-full bg-done" aria-hidden="true" />
              <span className="text-[13px] font-bold text-[#1F5A31]">
                Pendaftaran dibuka sekarang!
              </span>
            </span>

            <h1 className="m-0 font-display text-[31px] font-bold leading-[1.08] tracking-tight text-sand-900 sm:text-[46px]">
              Pastikan permohonan PTPTN anda berjaya dengan{" "}
              <span className="text-unitar-orange-ink">bimbingan pakar</span>
            </h1>

            <p className="m-0 max-w-md text-[15px] leading-relaxed text-sand-800 sm:text-[17.5px]">
              Kami telah berjaya membantu ramai pelajar dapatkan kelulusan
              pinjaman pelajaran mereka. Tempah sesi bimbingan permohonan PTPTN
              secara percuma dan hantar permohonan anda tanpa kesilapan.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollTo("booking")}
                className="flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-unitar-orange px-7 text-base font-bold text-white transition-colors hover:bg-unitar-orange-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-unitar-orange-ink"
              >
                <CalendarCheck className="h-[18px] w-[18px]" aria-hidden="true" />
                Tempah slot anda
              </button>
              <button
                type="button"
                onClick={() => scrollTo("session")}
                className="group flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-sand-400 bg-white px-6 text-[15px] font-semibold text-sand-900 transition-colors hover:bg-sand-50"
              >
                Apa yang berlaku semasa sesi
                <ChevronDown
                  className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </button>
            </div>

            <dl className="m-0 grid max-w-md grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-1 rounded-2xl bg-white p-4"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="m-0">
                    <span className="block font-display text-lg font-bold text-sand-900 sm:text-xl">
                      {stat.value}
                    </span>
                    <span className="mt-0.5 block text-xs leading-snug text-sand-700">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Contained rather than cropped — it is an illustration, so losing
              the cards around the edges loses the point of it. */}
          <div className="order-first flex items-center justify-center bg-sand-200 p-5 sm:p-8 lg:order-last lg:p-10">
            <Image
              src="/ptptn/hero-application.svg"
              width={1000}
              height={1000}
              alt="Ilustrasi borang permohonan PTPTN yang diisi langkah demi langkah semasa sesi bimbingan, dengan senarai semak dan status kelulusan"
              priority
              className="h-auto w-full max-w-[240px] sm:max-w-xs lg:max-w-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import {
  Mail,
  ScreenShare,
  BadgeCheck,
  AlertTriangle,
  CalendarCheck
} from "lucide-react";
import Image from "next/image";

const stages = [
  {
    icon: Mail,
    label: "Sebelum sesi anda",
    title: "Peringatan dan senarai semak",
    description:
      "Anda akan menerima e-mel peringatan sebelum slot anda, berserta senarai semak supaya anda boleh bersedia sepenuhnya sebelum panggilan."
  },
  {
    icon: ScreenShare,
    label: "Semasa sesi anda",
    title: "Kami lalui bersama-sama",
    description:
      "Sertai panggilan melalui Microsoft Teams dan kongsi skrin anda dengan pegawai SST. Kami akan membimbing anda melalui keseluruhan permohonan, langkah demi langkah, sambil anda mengisinya."
  },
  {
    icon: BadgeCheck,
    label: "Selepas anda menghantar",
    title: "Kelulusan dan menerima tawaran",
    description:
      "Kami akan tunjukkan bila anda boleh menjangkakan kelulusan, dan cara untuk menerima tawaran pinjaman anda setelah ia diluluskan."
  }
];

const mistakes = [
  {
    title: "Tarikh mula pengajian yang salah",
    detail:
      "Bulan dan tahun mula pengajian anda mesti sama dengan surat tawaran anda."
  },
  {
    title: "Nama institusi yang salah",
    detail: "Memilih kampus yang seakan sama atau entri UNITAR yang salah."
  },
  {
    title: "Surat tawaran yang salah",
    detail:
      "Memuat naik surat yang telah lapuk, atau surat bagi program yang berbeza."
  }
];

export function SessionInfoBM() {
  const scrollToBooking = () => {
    const target = document.getElementById("booking");
    if (!target) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section id="session" className="scroll-mt-20 px-5 pt-9 lg:px-10 lg:pt-14">
      <div className="mx-auto max-w-6xl">
        <p className="m-0 text-xs font-bold uppercase tracking-[0.08em] text-unitar-orange-ink">
          Tentang sesi ini
        </p>
        <h2 className="m-0 mt-1.5 max-w-2xl font-display text-[22px] font-bold tracking-tight text-sand-900 sm:text-[32px]">
          Satu sesi, supaya permohonan anda betul pada kali pertama
        </h2>
        <p className="m-0 mt-2 max-w-2xl text-[14.5px] leading-relaxed text-sand-800 sm:text-base">
          Kebanyakan permohonan PTPTN ditolak kerana kesilapan kecil dalam borang.
          Sesi 1-ke-1 percuma bersama Student Success Team (SST) ini memastikan
          permohonan anda bukan salah satu daripadanya.
        </p>

        {/* Feature image */}
        <div className="relative mt-5 overflow-hidden rounded-[22px] border border-sand-300 sm:mt-6 sm:rounded-[30px]">
          <Image
            src="/ptptn/session-online.jpg"
            alt="Seorang pelajar menyertai sesi bimbingan dalam talian menggunakan komputer riba"
            width={1400}
            height={933}
            sizes="(max-width: 1152px) 100vw, 1152px"
            className="h-56 w-full object-cover md:h-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sand-900/90 via-sand-900/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <p className="m-0 font-display text-lg font-bold text-white md:text-2xl">
              Kongsi skrin anda. Kami bimbing anda secara langsung.
            </p>
            <p className="m-0 mt-1.5 text-[13.5px] text-white/85 md:text-[15px]">
              Panggilan melalui Microsoft Teams selama 30 minit, satu-ke-satu
              bersama Student Success Team.
            </p>
          </div>
        </div>

        {/* How it works */}
        <ol className="m-0 mt-5 grid list-none grid-cols-1 gap-4 p-0 sm:mt-6 lg:grid-cols-3">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <li
                key={stage.label}
                className="flex flex-col gap-3 rounded-[18px] border border-sand-300 bg-white p-5 sm:p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-unitar-orange font-display text-[17px] font-bold text-white">
                    {index + 1}
                  </span>
                  <Icon
                    className="h-[22px] w-[22px] text-unitar-orange-ink opacity-80"
                    aria-hidden="true"
                  />
                </div>
                <p className="m-0 text-[11.5px] font-bold uppercase tracking-[0.07em] text-unitar-orange-ink">
                  {stage.label}
                </p>
                <h3 className="m-0 font-display text-base font-bold leading-snug text-sand-900 sm:text-[17px]">
                  {stage.title}
                </h3>
                <p className="m-0 text-[13.5px] leading-relaxed text-sand-800">
                  {stage.description}
                </p>
              </li>
            );
          })}
        </ol>

        {/* Common mistakes */}
        <div className="mt-9 lg:mt-12">
          <div className="flex items-center gap-2.5">
            <AlertTriangle
              className="h-5 w-5 shrink-0 text-[#B3261E]"
              aria-hidden="true"
            />
            <h3 className="m-0 font-display text-lg font-bold text-sand-900 sm:text-xl">
              Kesilapan yang paling kerap berlaku
            </h3>
          </div>

          <div className="mt-4 grid gap-3 sm:gap-4 md:grid-cols-3">
            {mistakes.map((mistake) => (
              <div
                key={mistake.title}
                className="flex flex-col gap-1.5 rounded-[18px] border border-[#F0D3D0] bg-[#FDECEA] p-5"
              >
                <p className="m-0 font-display text-[15px] font-bold leading-snug text-sand-900">
                  {mistake.title}
                </p>
                <p className="m-0 text-[13px] leading-relaxed text-[#7A4A45]">
                  {mistake.detail}
                </p>
              </div>
            ))}
          </div>

          <p className="m-0 mt-4 text-[13.5px] leading-relaxed text-sand-800">
            Mana-mana satu daripada kesilapan ini boleh menyebabkan permohonan anda
            ditolak. Kami akan semak kesemuanya bersama anda semasa sesi.
          </p>
        </div>

        {/* Closing CTA */}
        <div className="mt-9 flex flex-col items-center gap-4 rounded-[22px] bg-sand-100 p-6 text-center sm:rounded-[30px] sm:p-10 lg:mt-12">
          <p className="m-0 max-w-xl font-display text-lg font-bold text-sand-900 sm:text-xl">
            Tempahan slot adalah percuma dan mengambil masa kurang daripada satu
            minit.
          </p>
          <p className="m-0 max-w-xl text-[14.5px] leading-relaxed text-sand-800">
            Kami amat menggalakkan setiap pelajar menempah slot sebelum membuat
            permohonan.
          </p>
          <button
            type="button"
            onClick={scrollToBooking}
            className="flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-unitar-orange px-7 text-base font-bold text-white transition-colors hover:bg-unitar-orange-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-unitar-orange-ink"
          >
            <CalendarCheck className="h-[18px] w-[18px]" aria-hidden="true" />
            Tempah slot anda
          </button>
        </div>
      </div>
    </section>
  );
}

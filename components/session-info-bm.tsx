"use client";

import {
  Mail,
  ScreenShare,
  BadgeCheck,
  AlertTriangle,
  CalendarCheck
} from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="session" className="py-20 px-4 bg-card scroll-mt-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm font-medium text-primary mb-3">
            Tentang sesi ini
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 text-balance">
            Satu sesi, supaya permohonan anda betul pada kali pertama
          </h2>
          <p className="text-muted-foreground text-base md:text-lg text-balance max-w-2xl mx-auto">
            Kebanyakan permohonan PTPTN ditolak kerana kesilapan kecil dalam
            borang. Sesi 1-ke-1 percuma bersama Student Success Team (SST) ini
            memastikan permohonan anda bukan salah satu daripadanya.
          </p>
        </div>

        {/* Feature image */}
        <div className="relative rounded-2xl overflow-hidden border border-border shadow-sm mb-12">
          <Image
            src="/ptptn/session-online.jpg"
            alt="Seorang pelajar menyertai sesi bimbingan dalam talian menggunakan komputer riba"
            width={1400}
            height={933}
            sizes="(max-width: 768px) 100vw, 768px"
            className="w-full h-56 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <p className="text-lg md:text-2xl font-semibold text-white text-balance">
              Kongsi skrin anda. Kami bimbing anda secara langsung.
            </p>
            <p className="text-sm md:text-base text-white/80 mt-2 text-balance">
              Panggilan melalui Microsoft Teams selama 30 minit, satu-ke-satu
              bersama Student Success Team.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="space-y-4 mb-12">
          {stages.map((stage, index) => {
            const Icon = stage.icon;

            return (
              <Card
                key={stage.label}
                className="relative overflow-hidden transition-shadow hover:shadow-md"
              >
                <span className="absolute left-0 inset-y-0 w-1 bg-primary" />
                <CardContent className="flex items-start gap-4 p-6 pl-7">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-primary">
                        LANGKAH {index + 1}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        · {stage.label}
                      </span>
                    </div>
                    <p className="font-medium text-foreground text-balance">
                      {stage.title}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1.5 text-balance">
                      {stage.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Common mistakes */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
            <h3 className="text-xl font-semibold text-foreground text-balance">
              Kesilapan yang paling kerap berlaku
            </h3>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {mistakes.map((mistake) => (
              <Card
                key={mistake.title}
                className="border-destructive/30 bg-destructive/5"
              >
                <CardContent className="p-5">
                  <p className="font-medium text-foreground text-balance">
                    {mistake.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1.5 text-balance">
                    {mistake.detail}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-sm text-muted-foreground mt-4 text-balance">
            Mana-mana satu daripada kesilapan ini boleh menyebabkan permohonan
            anda ditolak. Kami akan semak kesemuanya bersama anda semasa sesi.
          </p>
        </div>

        {/* Closing CTA */}
        <div className="p-8 rounded-2xl bg-accent/10 border border-accent/20 text-center">
          <p className="text-lg font-medium text-foreground text-balance mb-2">
            Tempahan slot adalah percuma dan mengambil masa kurang daripada satu
            minit.
          </p>
          <p className="text-muted-foreground text-balance mb-6">
            Kami amat menggalakkan setiap pelajar menempah slot sebelum membuat
            permohonan.
          </p>
          <Button
            onClick={scrollToBooking}
            size="lg"
            className="rounded-full px-8 py-6 text-base gap-2"
          >
            <CalendarCheck className="w-4 h-4" />
            Tempah Slot Anda
          </Button>
        </div>
      </div>
    </section>
  );
}

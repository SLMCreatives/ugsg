"use client";

import { ArrowDownCircle, Check, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface EligibilitySectionProps {
  eligibility: {
    citizen: boolean;
    age: boolean;
    semester: boolean;
    noSponsorship: boolean;
  };
  onEligibilityChange: (key: string, value: boolean) => void;
}

const criteria = [
  {
    key: "citizen",
    label: "Warganegara Malaysia",
    description: "Anda mestilah warganegara Malaysia"
  },
  {
    key: "age",
    label: "Umur 45 atau di bawah",
    description: "Pada masa permohonan dibuat"
  },
  {
    key: "semester",
    label: "Setidak-tidaknya satu semester yang tinggal",
    description: "Dalam pengajian anda saat ini"
  },
  {
    key: "noSponsorship",
    label: "Tidak menerima tajaan lain",
    description: "Contohnya: MARA, JPA"
  }
];

export function EligibilitySectionBM({
  eligibility,
  onEligibilityChange
}: EligibilitySectionProps) {
  const allEligible = Object.values(eligibility).every(Boolean);
  const eligibleCount = Object.values(eligibility).filter(Boolean).length;

  return (
    <section id="eligibility" className="py-16 px-4 scroll-mt-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm font-medium text-muted-foreground mb-2">
            Bahagian 1:
          </p>
          <h2 className="text-5xl md:text-4xl font-semibold text-foreground mb-4">
            Semak Kelayakan Anda
          </h2>
          <p className="text-muted-foreground text-lg text-balance">
            Sebelum bermula, pastikan anda menepati kriteria asas yang
            ditetapkan. Aktifkan kriteria di bawah sebelum ke bahagian
            seterusnya.
          </p>
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Adakah Anda Layak?</span>
              {/*  <span className="text-sm font-normal text-muted-foreground">
                {eligibleCount} dari {criteria.length} dipenuhi
              </span> */}
            </CardTitle>
            <CardDescription>
              Aktifkan setiap kriteria yang sudah dipenuhi{" "}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {criteria.map((item) => (
              <div
                key={item.key}
                className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                  eligibility[item.key as keyof typeof eligibility]
                    ? "bg-accent/10"
                    : "bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      eligibility[item.key as keyof typeof eligibility]
                        ? "bg-green-50 text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {eligibility[item.key as keyof typeof eligibility] ? (
                      <Check className="w-4 h-4 text-green-500 " />
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor={item.key}
                      className="font-medium cursor-pointer"
                    >
                      {item.label}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
                <Switch
                  id={item.key}
                  checked={eligibility[item.key as keyof typeof eligibility]}
                  onCheckedChange={(checked) =>
                    onEligibilityChange(item.key, checked)
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {!allEligible && (
          <div className="mt-6 flex items-center gap-3 text-sm text-center w-full justify-center ">
            <p className="text-muted-foreground text-balance">
              Jika anda tidak layak, sila hubungi kami di{" "}
              <Link
                href="mailto:sst@unitar.my"
                className="text-primary hover:underline"
              >
                sst@unitar.my
              </Link>{" "}
              untuk bantuan lanjut.
            </p>
          </div>
        )}

        {allEligible && (
          <div className="mt-20 p-4 rounded-lg bg-accent/10 border border-accent/20 text-center">
            <p className="text-4xl font-semibold mb-4">Bagus!</p>
            <p className="text-foreground font-medium text-balance mb-4">
              Anda memenuhi semua kriteria kelayakan. Teruskan ke senarai semak
              di bawah.
            </p>
            <ArrowDownCircle className="w-8 h-8 text-primary mx-auto mt-8 animate-bounce" />
          </div>
        )}
      </div>
    </section>
  );
}

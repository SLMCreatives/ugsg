"use client";

import { ExternalLink, Check, Lightbulb } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ChecklistSectionProps {
  checklist: {
    bankIslam: boolean;
    myDigitalId: boolean;
    myPtptn: boolean;
    sspnPrime: boolean;
    ptptnPin: boolean;
  };
  onChecklistChange: (key: string, value: boolean) => void;
  isEligible: boolean;
}

const steps = [
  {
    key: "bankIslam",
    step: 1,
    title: "Bank Islam Akaun Simpanan",
    task: "Buka akaun simpanan Bank Islam atas nama anda sendiri. Jika anda mempunyai akaun sedia ada, pastikan ia aktif dan mempunyai butiran terkini anda.",
    note: "Sila login ke akaun Bank Islam anda secara dalam talian untuk mengesahkan butiran akaun anda dan memastikan ia aktif.",
    actions: [
      {
        label: "Login ke Akaun Bank Islam Anda Secara Dalam Talian",
        url: "https://www.bankislam.com"
      }
    ]
  },
  {
    key: "myDigitalId",
    step: 2,
    title: "Aplikasi MyDigital ID",
    task: "Muat turun dan sediakan aplikasi MyDigital ID. Sila pastikan akaun MyDigital ID anda telah disetkan dan sedia untuk digunakan, kerana ia diperlukan untuk proses permohonan.",
    actions: [
      {
        label: "App Store",
        url: "https://apps.apple.com/my/app/mydigital-id/id1435289143"
      },
      {
        label: "Google Play Store",
        url: "https://play.google.com/store/apps/details?id=my.mimos.signetclient"
      }
    ]
  },
  {
    key: "myPtptn",
    step: 3,
    title: "Aplikasi myPTPTN",
    task: "Muat turun aplikasi rasmi myPTPTN. Aplikasi ini penting untuk mengurus permohonan pinjaman PTPTN anda dan melihat keputusan permohonan anda.",
    actions: [
      {
        label: "App Store",
        url: "https://apps.apple.com/my/app/myptptn/id1601433091"
      },
      {
        label: "Google Play Store",
        url: "https://play.google.com/store/apps/details?id=com.ptptnapp"
      }
    ]
  },
  {
    key: "sspnPrime",
    step: 4,
    title: "Akaun SSPN Prime",
    task: "Buka akaun dengan deposit minimum RM20.00.",
    proTip:
      "Jika anda sudah mempunyai akaun aktif, sistem akan mengesaninya secara automatik—tiada keperluan untuk membuka yang baru!",
    actions: [
      {
        label: "Open SSPN Prime Account",
        url: "https://www.ptptn.gov.my/simpan-sspn/simpan-sspn-prime/"
      }
    ]
  },
  {
    key: "ptptnPin",
    step: 5,
    title: "PTPTN PIN",
    task: "Beli PIN permohonan anda dengan harga RM 5. Pastikan anda telah membuka akaun SSPN-i atau SSPN Prime, kerana PIN tersebut dipautkan kepadanya.",
    options: [
      "Mesin ATM BSN",
      "Dalam talian melalui laman web myPTPTN (semasa permohonan)"
    ],
    actions: [
      {
        label: "Beli PIN PTPTN Dalam Talian",
        url: "https://myptptn.ptptn.gov.my/ptptn/app/"
      }
    ]
  }
];

export function ChecklistSectionBM({
  checklist,
  onChecklistChange,
  isEligible
}: ChecklistSectionProps) {
  const completedCount = Object.values(checklist).filter(Boolean).length;
  const progress = (completedCount / steps.length) * 100;

  return (
    <section id="checklist" className="py-16 px-4 bg-card">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm font-medium text-muted-foreground mb-2">
            Bahagian 2:
          </p>
          <h2 className="text-5xl md:text-4xl font-semibold text-foreground mb-4">
            Senarai Semak Permohonan
          </h2>
          <p className="text-muted-foreground text-md text-balance">
            Lengkapkan 5 langkah ini untuk menyediakan permohonan anda. Ini
            adalah untuk memastikan anda mempunyai segala-galanya yang sedia
            untuk proses permohonan yang lancar bersama kami.
          </p>
          <p className="text-foreground text-md mt-4 text-balance">
            Jangan risau, kami akan membantu anda melalui setiap langkah!
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Kemajuan</span>
            <span className="font-medium text-foreground">
              {completedCount} dari {steps.length} lengkap
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Checklist Items */}
        <div className="space-y-4">
          {steps.map((item) => {
            const isChecked = checklist[item.key as keyof typeof checklist];
            const isDisabled = !isEligible;

            return (
              <Card
                key={item.key}
                className={`transition-all duration-300 ${
                  isChecked ? "border-accent bg-accent/5" : ""
                } ${isDisabled ? "opacity-50" : ""}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center gap-3 pt-1">
                      <Checkbox
                        id={item.key}
                        checked={isChecked}
                        onCheckedChange={(checked) =>
                          onChecklistChange(item.key, checked as boolean)
                        }
                        disabled={isDisabled}
                        className="h-6 w-6"
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="flex items-start gap-2">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary text-primary-foreground text-nowrap mt-1">
                          Langkah {item.step}
                        </span>
                        <Label
                          htmlFor={item.key}
                          className={`text-lg cursor-pointer ${isChecked ? "line-through text-muted-foreground" : ""}`}
                        >
                          {item.title}
                        </Label>
                        {isChecked && <Check className="w-5 h-5 text-accent" />}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {item.task}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 pl-14">
                  {item.note && (
                    <p className="text-sm text-muted-foreground mb-3 italic">
                      Nota: {item.note}
                    </p>
                  )}

                  {item.proTip && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/10 mb-3">
                      <Lightbulb className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-foreground">
                        <strong>Pro tip:</strong> {item.proTip}
                      </p>
                    </div>
                  )}

                  {item.options && (
                    <div className="space-y-2 mb-3">
                      <p className="text-sm font-medium text-foreground">
                        Kaedah untuk membeli PIN PTPTN:
                      </p>
                      <ul className="space-y-1">
                        {item.options.map((option, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-muted-foreground flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                            {option}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {item.actions && item.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.actions.map((action, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          asChild
                          disabled={isDisabled}
                        >
                          <a
                            href={action.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {action.label}
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        </Button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {!isEligible && (
          <div className="mt-6 p-4 rounded-lg bg-muted border border-border text-center">
            <p className="text-muted-foreground">
              Sila lengkapkan semakan kelayakan di atas untuk membuka kunci
              senarai semak.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

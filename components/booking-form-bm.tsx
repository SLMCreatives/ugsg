"use client";

import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export function BookingFormBM() {
  return (
    <Card className="w-full max-w-md mx-auto p-8 text-center bg-white">
      <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Tempahan Telah Ditutup
      </h3>
      <p className="text-muted-foreground text-balance">
        Kami telah melepasi tempoh untuk menempah slot masa.
      </p>
      <p className="text-muted-foreground text-balance mt-3">
        Jika anda memerlukan bantuan dengan permohonan PTPTN anda, sila hubungi{" "}
        <span className="font-semibold">Penasihat SST</span> anda, atau e-mel
        kami di{" "}
        <a
          href="mailto:sst@unitar.my"
          className="font-semibold text-foreground underline underline-offset-2"
        >
          sst@unitar.my
        </a>
        .
      </p>
    </Card>
  );
}

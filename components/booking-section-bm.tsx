"use client";

import { PartyPopper, Clock, Target } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { BookingFormBM } from "./booking-form-bm";

export function BookingSectionBM() {
  return (
    <section id="booking" className="py-16 px-4 scroll-mt-8">
      <div className="max-w-2xl mx-auto">
        <Card className="border-primary border-2 shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <PartyPopper className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl md:text-3xl">
              {"Tempah Slot Anda"}
            </CardTitle>
            <CardDescription className="text-base mt-2 text-balance">
              Pilih masa yang sesuai untuk anda dan{" "}
              {"mari pastikan aplikasi anda 100% betul!"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid grid-cols-[1fr_auto] items-center gap-3 p-4 rounded-lg bg-muted/50">
                  <Clock className="w-8 h-8 text-primary mt-0.5" />
                  <div className="text-left">
                    <p className="font-medium text-foreground">
                      Apa yang Perlu Dijangka
                    </p>
                    <p className="text-sm text-muted-foreground text-balance">
                      Sesi 30 minit, secara bersemuka di mana kami akan
                      membimbing anda melalui portal dalam talian langkah demi
                      langkah.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-[1fr_auto] items-center gap-3 p-4 rounded-lg bg-muted/50 justify-center">
                  <Target className="w-8 h-8 text-primary" />
                  <div className="pr-10">
                    <p className="font-medium text-foreground">Matlamat</p>
                    <p className="text-sm text-muted-foreground text-balance">
                      Menghantar aplikasi anda dengan betul pada masa pertama.
                    </p>
                  </div>
                </div>
              </div>

              <BookingFormBM />

              <p className="text-center text-xs text-muted-foreground">
                Kami berharap dapat membantu anda mendapatkan pinjaman PTPTN
                anda!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

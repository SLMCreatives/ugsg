"use client";

import { PartyPopper, Clock, Target, Calendar, Lock } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookingForm } from "./booking-form";
import { BookingFormBM } from "./booking-form-bm";

interface BookingSectionProps {
  isUnlocked: boolean;
}

export function BookingSectionBM({ isUnlocked }: BookingSectionProps) {
  return (
    <section id="booking" className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <Card
          className={`transition-all duration-500 ${
            isUnlocked
              ? "border-primary border-2 shadow-lg"
              : "opacity-60 grayscale"
          }`}
        >
          <CardHeader className="text-center pb-4">
            {isUnlocked ? (
              <>
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <PartyPopper className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl md:text-3xl">
                  {"Dah Sedia untuk Tempah Slot Anda!"}
                </CardTitle>
                <CardDescription className="text-base mt-2 text-balance">
                  Nampaknya semuanya telah disediakan.{" "}
                  {"Mari pastikan aplikasi anda 100% betul!"}
                </CardDescription>
              </>
            ) : (
              <>
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <Lock className="w-8 h-8 text-muted-foreground" />
                </div>
                <CardTitle className="text-2xl md:text-3xl text-muted-foreground">
                  Bahagian 3: Tempah Sesi Anda
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  Lengkapkan semua langkah di atas untuk membuka tempahan.
                </CardDescription>
              </>
            )}
          </CardHeader>
          <CardContent>
            {isUnlocked ? (
              <div className="space-y-6">
                {/* What to expect */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid grid-cols-[1fr_auto] items-center gap-3 p-4 rounded-lg bg-muted/50">
                    <Clock className="w-8 h-8 text-primary mt-0.5" />
                    <div className="text-left">
                      <p className="font-medium text-foreground">
                        Apa yang Perlu Dijangka
                      </p>
                      <p className="text-sm text-muted-foreground text-balance">
                        Sesi 20 minit, secara dalam talian di mana kami akan
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

                {/* Booking Form */}
                <BookingFormBM />

                <p className="text-center text-xs text-muted-foreground">
                  Kami berharap dapat membantu anda mendapatkan pinjaman PTPTN
                  anda!{" "}
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="space-y-4">
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((step) => (
                      <div
                        key={step}
                        className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm text-muted-foreground"
                      >
                        {step}
                      </div>
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    Lengkapkan semua 5 langkah senarai semak untuk membuka
                    tempahan.{" "}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

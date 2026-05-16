"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle } from "lucide-react";

interface SlotCount {
  [key: string]: number;
}

/* const AVAILABLE_DATES = [
  "Tuesday, 5 May 2026",
  "Wednesday, 6 May 2026",
  "Thursday, 7 May 2026",
  "Tuesday, 12 May 2026",
  "Wednesday, 13 May 2026",
  "Thursday, 14 May 2026"
];

const TIME_SLOTS = [
  { label: "Morning (10am - 12pm)", value: "morning" },
  { label: "Evening (3pm - 5pm)", value: "evening" }
]; */

export const SLOTS = [
  /* { date: "Tuesday, 12 May 2026", time: "morning", slots: 8 },
  { date: "Tuesday, 12 May 2026", time: "evening", slots: 6 },
  { date: "Wednesday, 13 May 2026", time: "morning", slots: 14 }, 
  { date: "Wednesday, 13 May 2026", time: "evening", slots: 12 },
  { date: "Thursday, 14 May 2026", time: "morning", slots: 10 },
  */
  { date: "Thursday, 14 May 2026", time: "evening", slots: 9 }
];

/* const MAX_SUBMISSIONS_PER_SLOT = 6; */

export function BookingForm() {
  return (
    <Card className="w-full max-w-md mx-auto p-8 text-center bg-white">
      <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Booking Period Has Closed
      </h3>
      <p className="text-muted-foreground text-balance">
        We have passed the period for booking a timeslot.
      </p>
      <p className="text-muted-foreground text-balance mt-3">
        If you need help with your PTPTN application, please contact your{" "}
        <span className="font-semibold">SST Advisor</span>, or email us at{" "}
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

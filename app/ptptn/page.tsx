"use client";

import { useState, useEffect } from "react";
import { HeroSection } from "@/components/hero-section";
import { EligibilitySection } from "@/components/eligibility-section";
import { ChecklistSection } from "@/components/checklist-section";
import { BookingSection } from "@/components/booking-section";

export default function PTPTNPageBM() {
  const [eligibility, setEligibility] = useState({
    citizen: false,
    age: false,
    semester: false,
    noSponsorship: false
  });

  const [checklist, setChecklist] = useState({
    bankIslam: false,
    myDigitalId: false,
    myPtptn: false,
    sspnPrime: false,
    ptptnPin: false
  });

  const isEligible = Object.values(eligibility).every(Boolean);
  const isChecklistComplete = Object.values(checklist).every(Boolean);
  const isBookingUnlocked = isEligible && isChecklistComplete;

  const handleEligibilityChange = (key: string, value: boolean) => {
    setEligibility((prev) => ({ ...prev, [key]: value }));
  };

  const handleChecklistChange = (key: string, value: boolean) => {
    setChecklist((prev) => ({ ...prev, [key]: value }));
  };

  // Auto-scroll to booking when unlocked
  useEffect(() => {
    if (isBookingUnlocked) {
      setTimeout(() => {
        document
          .getElementById("booking")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [isBookingUnlocked]);

  return (
    <main className="min-h-screen">
      <HeroSection />
      <EligibilitySection
        eligibility={eligibility}
        onEligibilityChange={handleEligibilityChange}
      />
      <ChecklistSection
        checklist={checklist}
        onChecklistChange={handleChecklistChange}
        isEligible={isEligible}
      />
      <BookingSection isUnlocked={isBookingUnlocked} />

      {/* Footer */}
      <footer className="py-8 px-4 text-center border-t border-border">
        <p className="text-sm text-muted-foreground">
          Helping Malaysian students secure their PTPTN loans since 2020.
        </p>
      </footer>
    </main>
  );
}

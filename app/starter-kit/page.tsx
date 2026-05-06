"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import HeroSection from "@/components/kits/HeroSection";
import FormSection from "@/components/kits/FormSection";
import InfoSection from "@/components/kits/InfoSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-950">
      <HeroSection />
      <FormSection />
      <InfoSection />
    </main>
  );
}

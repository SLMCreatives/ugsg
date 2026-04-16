"use client";

import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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
  { key: "citizen", label: "Malaysian Citizen", description: "You must be a Malaysian citizen" },
  { key: "age", label: "Age 45 or below", description: "At the time of application" },
  { key: "semester", label: "At least one semester remaining", description: "In your current studies" },
  { key: "noSponsorship", label: "Not receiving other sponsorship", description: "e.g., MARA, JPA" },
];

export function EligibilitySection({ eligibility, onEligibilityChange }: EligibilitySectionProps) {
  const allEligible = Object.values(eligibility).every(Boolean);
  const eligibleCount = Object.values(eligibility).filter(Boolean).length;

  return (
    <section id="eligibility" className="py-16 px-4 scroll-mt-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Phase 1: Eligibility Check
          </h2>
          <p className="text-muted-foreground text-lg">
            Before we begin, let&apos;s make sure you meet the basic criteria.
          </p>
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Are you eligible?</span>
              <span className="text-sm font-normal text-muted-foreground">
                {eligibleCount} of {criteria.length} met
              </span>
            </CardTitle>
            <CardDescription>
              Toggle each criterion that applies to you
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
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {eligibility[item.key as keyof typeof eligibility] ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <Label htmlFor={item.key} className="font-medium cursor-pointer">
                      {item.label}
                    </Label>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <Switch
                  id={item.key}
                  checked={eligibility[item.key as keyof typeof eligibility]}
                  onCheckedChange={(checked) => onEligibilityChange(item.key, checked)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {allEligible && (
          <div className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/20 text-center">
            <p className="text-accent font-medium">
              Great! You meet all the eligibility criteria. Proceed to the checklist below.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

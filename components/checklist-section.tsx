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
    title: "Bank Islam Savings Account",
    task: "Open a savings Bank Islam account in your own name. If you have an existing account, make sure it is active and has your current details.",
    note: "Please login to your Bank Islam account online to verify your account details and ensure it is active.",
    actions: [
      {
        label: "Login to your Bank Islam Account Online",
        url: "https://www.bankislam.com"
      }
    ]
  },
  {
    key: "myDigitalId",
    step: 2,
    title: "MyDigital ID App",
    task: "Download and set up the MyDigital ID app. Please make sure that your MyDigital ID account set up and ready to use, as it is required for the application process.",
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
    title: "myPTPTN App",
    task: "Download the official myPTPTN app. This app is essential for managing your PTPTN loan application and viewing the results of your application.",
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
    title: "SSPN Prime Account",
    task: "Open an account with a minimum deposit of RM20.00.",
    proTip:
      "If you already have an active account, the system will detect it automatically—no need to open a new one!",
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
    title: "PTPTN PIN (Valid for 6 months)",
    task: "Purchase your application PIN for RM 5. Ensure that you have opened an SSPN-i or SSPN Prime account, as the PIN is linked to it.",
    options: [
      "BSN ATM Machine",
      "Online via the myPTPTN website (during application)"
    ],
    actions: [
      {
        label: "Buy PTPTN PIN Online",
        url: "https://myptptn.ptptn.gov.my/ptptn/app/"
      }
    ]
  }
];

export function ChecklistSection({
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
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Phase 2: Application Checklist
          </h2>
          <p className="text-muted-foreground text-md text-balance">
            Complete these 5 steps to prepare your application. This is to make
            sure that you have everything ready for a smooth application process
            with us.
          </p>
          <p className="text-foreground text-md mt-4">
            Don&apos;t worry, we will guide you through each step!
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-foreground">
              {completedCount} of {steps.length} completed
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
                      <CardTitle className="flex items-center gap-2">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary text-primary-foreground">
                          Step {item.step}
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
                      Note: {item.note}
                    </p>
                  )}

                  {item.proTip && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/10 mb-3">
                      <Lightbulb className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-foreground">
                        <strong>Pro-Tip:</strong> {item.proTip}
                      </p>
                    </div>
                  )}

                  {item.options && (
                    <div className="space-y-2 mb-3">
                      <p className="text-sm font-medium text-foreground">
                        Methods to purchase PTPTN PIN:
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
              Please complete the eligibility check above to unlock the
              checklist.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

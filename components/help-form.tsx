"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle } from "lucide-react";

const ISSUES = [
  "Account Login Issues",
  "Request MFA Reset",
  "Class Registration & Schedule",
  "Onboarding Recording",
  "Class Links",
  "Whatsapp Group Links",
  "PTPTN Application",
  "Payment"
];

const SST_ADVISORS = [
  "Amirul Adli",
  "Ayu Iraruza",
  "Nurul Farzana",
  "Kamila Najwa",
  "Miruthala"
];

export function HelpForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [matric, setMatric] = useState("");
  const [issue, setIssue] = useState("");
  const [sst, setSst] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validatePhone = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const valid = /^(\+?6?01)[0-9]{8,9}$/.test(cleaned);
    setPhoneError(
      !valid && value.length > 0 ? "Please enter a valid Malaysian phone number" : ""
    );
    setPhone(value);
  };

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim() || !matric.trim() || !issue || !sst) {
      setError("Please fill in all fields.");
      return;
    }
    if (phoneError) {
      setError("Please enter a valid phone number.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/help-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.replace(/\s/g, "").trim(),
          matric: matric.trim(),
          issue,
          sst
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="w-full max-w-lg mx-auto p-8 text-center bg-white">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Request Submitted!
        </h3>
        <p className="text-muted-foreground text-balance">
          Thank you, <span className="font-semibold">{name}</span>! Your help
          request has been received.
        </p>
        <p className="text-muted-foreground text-balance mt-3 text-sm">
          Just a reminder that our official operating hours are{" "}
          <span className="font-semibold">weekdays, 9am – 6pm</span>. We will
          get back to you at the earliest opportunity during these hours.
        </p>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto p-6 bg-white space-y-5">
      {/* Personal details */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-foreground text-center">Your Details</h3>

        <div>
          <Label htmlFor="name" className="mb-1.5 block text-center">Full Name</Label>
          <Input
            id="name"
            placeholder="Nur Farzana Binti Abdul Azizan"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-center"
          />
        </div>

        <div>
          <Label htmlFor="phone" className="mb-1.5 block text-center">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="0123456789"
            value={phone}
            onChange={(e) => validatePhone(e.target.value)}
            className="text-center"
          />
          {phoneError && (
            <p className="text-destructive text-sm mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {phoneError}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="matric" className="mb-1.5 block text-center">Matric No.</Label>
          <Input
            id="matric"
            placeholder="MC26051234"
            value={matric}
            onChange={(e) => setMatric(e.target.value)}
            className="text-center"
          />
        </div>
      </div>

      <hr className="border-border" />

      {/* Issue */}
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-foreground text-center">What do you need help with?</h3>
        <select
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md bg-white text-foreground text-center focus:outline-none focus:ring-2 focus:ring-accent text-sm"
        >
          <option value="">Select an issue</option>
          {ISSUES.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      <hr className="border-border" />

      {/* SST preference */}
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-foreground text-center">SST Advisor</h3>
        <p className="text-sm text-muted-foreground text-center">
          Pick a specific advisor, or let us assign one for you.
        </p>
        <select
          value={sst}
          onChange={(e) => setSst(e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md bg-white text-foreground text-center focus:outline-none focus:ring-2 focus:ring-accent text-sm"
        >
          <option value="">Select an advisor</option>
          {SST_ADVISORS.map((advisor) => (
            <option key={advisor} value={advisor}>{advisor}</option>
          ))}
          <option value="No preference – assign me to anyone">No preference – assign me to anyone</option>
        </select>
      </div>

      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
        type="button"
      >
        {loading ? "Submitting..." : "Submit Request"}
      </Button>
    </Card>
  );
}

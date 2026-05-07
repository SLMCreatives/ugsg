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
import { CheckCircle, AlertCircle } from "lucide-react";

const locations = [
  { value: "kelana_jaya", label: "Kelana Jaya" },
  { value: "kuala_lumpur", label: "Kuala Lumpur" },
  { value: "sungai_petani", label: "Sungai Petani" },
  { value: "ipoh", label: "Ipoh" },
  { value: "johor_bharu", label: "Johor Bharu" },
  { value: "kota_bharu", label: "Kota Bharu" },
  { value: "kota_kinabalu", label: "Kota Kinabalu" },
  { value: "kuala_terengganu", label: "Kuala Terengganu" },
  { value: "pulau_pinang", label: "Pulau Pinang" },
  { value: "melaka", label: "Melaka" },
  { value: "kuching", label: "Kuching" }
];

const getLocationLabel = (value: string) => {
  return locations.find((loc) => loc.value === value)?.label || value;
};

type FormData = {
  name: string;
  matricNumber: string;
  phone: string;
  email: string;
  campus: string;
  tshirtSize: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialFormData: FormData = {
  name: "",
  matricNumber: "",
  phone: "",
  email: "",
  campus: "",
  tshirtSize: ""
};

export default function FormSection() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value
    }));

    if (errors[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: undefined
      }));
    }

    if (error) {
      setError("");
    }
  };

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined
      }));
    }

    if (error) {
      setError("");
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.matricNumber.trim()) {
      newErrors.matricNumber = "Matric number is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\-\s()]{8,20}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.campus) {
      newErrors.campus = "Please select a pickup campus";
    }

    if (!formData.tshirtSize) {
      newErrors.tshirtSize = "Please select a t-shirt size";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setSuccess(false);

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const payload: FormData = {
        name: formData.name.trim(),
        matricNumber: formData.matricNumber.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim().toLowerCase(),
        campus: formData.campus,
        tshirtSize: formData.tshirtSize
      };

      const response = await fetch("/api/starter-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || "Failed to submit registration");
      }

      setSubmittedData(payload);
      setSuccess(true);
      setFormData(initialFormData);
      setErrors({});
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="form-section" className="py-16 md:py-24 px-4 scroll-mt-20">
      <div className="max-w-2xl mx-auto">
        <div className="space-y-2 text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">
            Fill Out Your Information
          </h2>
          <p className="text-lg">
            Complete this form to reserve your starter kit
          </p>
        </div>

        {success && submittedData ? (
          <div className="space-y-4">
            <Alert className="bg-cyan-500/10 border-cyan-500/30">
              <CheckCircle className="h-4 w-4 text-cyan-500" />
              <AlertDescription>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-base">
                      Thank you for filling up the form!
                    </p>
                    <p className="mt-1">
                      Your starter kit registration has been received
                      successfully.
                    </p>
                  </div>

                  <div className="rounded-lg border border-cyan-500/20 bg-slate-900/10 p-4">
                    <p>
                      <span className="font-semibold">
                        Preferred pickup campus:
                      </span>{" "}
                      {getLocationLabel(submittedData.campus)}
                    </p>
                  </div>
                  <div className="rounded-lg border border-cyan-500/20 bg-slate-900/10 p-4">
                    <p>
                      <span className="font-semibold">Pickup Slot:</span> June
                      29 - July 30, 2026 (Exact date and time will be
                      communicated via email)
                    </p>
                  </div>

                  <p>
                    Please look out in your inbox for any updates regarding your
                    starter kit pickup.
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <Card className="dark bg-slate-800 border-slate-700 p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  disabled={loading}
                  className="dark bg-slate-700 border-slate-600 placeholder-slate-400"
                />
                {errors.name && (
                  <p id="name-error" className="text-red-400 text-sm">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Matric Number */}
              <div className="space-y-2">
                <Label htmlFor="matricNumber" className="text-base">
                  Matric Number *
                </Label>
                <Input
                  id="matricNumber"
                  name="matricNumber"
                  type="text"
                  placeholder="Enter your matric number"
                  value={formData.matricNumber}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.matricNumber}
                  aria-describedby={
                    errors.matricNumber ? "matricNumber-error" : undefined
                  }
                  disabled={loading}
                  className="dark bg-slate-700 border-slate-600 placeholder-slate-400"
                />
                {errors.matricNumber && (
                  <p id="matricNumber-error" className="text-red-400 text-sm">
                    {errors.matricNumber}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  disabled={loading}
                  className="dark bg-slate-700 border-slate-600 placeholder-slate-400"
                />
                {errors.phone && (
                  <p id="phone-error" className="text-red-400 text-sm">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  disabled={loading}
                  className="dark bg-slate-700 border-slate-600 placeholder-slate-400"
                />
                {errors.email && (
                  <p id="email-error" className="text-red-400 text-sm">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Campus Selection */}
              <div className="space-y-2">
                <Label htmlFor="campus" className="text-base">
                  Preferred Pickup Campus *
                </Label>
                <Select
                  value={formData.campus}
                  onValueChange={(value) => handleSelectChange("campus", value)}
                  disabled={loading}
                >
                  <SelectTrigger
                    id="campus"
                    aria-invalid={!!errors.campus}
                    aria-describedby={
                      errors.campus ? "campus-error" : undefined
                    }
                    className="dark bg-slate-700 border-slate-600"
                  >
                    <SelectValue placeholder="Select a campus" />
                  </SelectTrigger>
                  <SelectContent className="dark bg-slate-700 border-slate-600">
                    {locations.map((loc) => (
                      <SelectItem key={loc.value} value={loc.value}>
                        {loc.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.campus && (
                  <p id="campus-error" className="text-red-400 text-sm">
                    {errors.campus}
                  </p>
                )}
              </div>

              {/* T-Shirt Size */}
              <div className="space-y-2">
                <Label htmlFor="tshirtSize" className="text-base">
                  T-Shirt Size *
                </Label>
                <Select
                  value={formData.tshirtSize}
                  onValueChange={(value) =>
                    handleSelectChange("tshirtSize", value)
                  }
                  disabled={loading}
                >
                  <SelectTrigger
                    id="tshirtSize"
                    aria-invalid={!!errors.tshirtSize}
                    aria-describedby={
                      errors.tshirtSize ? "tshirtSize-error" : undefined
                    }
                    className="dark bg-slate-700 border-slate-600"
                  >
                    <SelectValue placeholder="Select your size" />
                  </SelectTrigger>
                  <SelectContent className="dark bg-slate-700 border-slate-600">
                    <SelectItem value="S">Small (S)</SelectItem>
                    <SelectItem value="M">Medium (M)</SelectItem>
                    <SelectItem value="L">Large (L)</SelectItem>
                    <SelectItem value="XL">Extra Large (XL)</SelectItem>
                    <SelectItem value="2XL">2X Large (2XL)</SelectItem>
                    <SelectItem value="3XL">3X Large (3XL)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.tshirtSize && (
                  <p id="tshirtSize-error" className="text-red-400 text-sm">
                    {errors.tshirtSize}
                  </p>
                )}
              </div>

              {/* Global API Error */}
              {error && (
                <Alert className="bg-red-500/10 border-red-500/30">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-red-300">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 text-lg rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit Registration"}
              </Button>
            </form>

            <p className="text-center text-slate-400 text-sm">
              All fields marked with * are required
            </p>
          </Card>
        )}
      </div>
    </section>
  );
}

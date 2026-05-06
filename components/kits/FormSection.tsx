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
import { CheckCircle } from "lucide-react";

export default function FormSection() {
  const [formData, setFormData] = useState({
    name: "",
    matricNumber: "",
    phone: "",
    email: "",
    campus: "",
    tshirtSize: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.matricNumber.trim())
      newErrors.matricNumber = "Matric Number is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.campus) newErrors.campus = "Please select a campus";
    if (!formData.tshirtSize)
      newErrors.tshirtSize = "Please select a t-shirt size";

    return newErrors;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/starter-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          matricNumber: formData.matricNumber,
          phone: formData.phone,
          email: formData.email,
          campus: formData.campus,
          tshirtSize: formData.tshirtSize
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit booking");
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="form-section" className=" py-16 md:py-24 px-4 scroll-mt-20">
      <div className="max-w-2xl mx-auto">
        <div className="space-y-2 text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">
            Fill Out Your Information
          </h2>
          <p className="text-lg">
            Complete this form to reserve your starter kit
          </p>
        </div>

        {success ? (
          <div className="space-y-4">
            <Alert className="bg-cyan-500/10 border-cyan-500/30">
              <CheckCircle className="h-4 w-4 text-cyan-500" />
              <AlertDescription className="">
                Thank you for registering! Your starter kit is reserved. Please
                remember to collect it during the pick-up window (June 29 - July
                30, 2024).
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <Card className="dark bg-slate-800 border-slate-700 p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className=" text-base">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="dark bg-slate-700 border-slate-600  placeholder-slate-400"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm">{errors.name}</p>
                )}
              </div>

              {/* Matric Number */}
              <div className="space-y-2">
                <Label htmlFor="matricNumber" className=" text-base">
                  Matric Number *
                </Label>
                <Input
                  id="matricNumber"
                  name="matricNumber"
                  type="text"
                  placeholder="Enter your matric number"
                  value={formData.matricNumber}
                  onChange={handleInputChange}
                  className="dark bg-slate-700 border-slate-600  placeholder-slate-400"
                />
                {errors.matricNumber && (
                  <p className="text-red-400 text-sm">{errors.matricNumber}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className=" text-base">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="dark bg-slate-700 border-slate-600  placeholder-slate-400"
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm">{errors.phone}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className=" text-base">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="dark bg-slate-700 border-slate-600  placeholder-slate-400"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Campus Selection */}
              <div className="space-y-2">
                <Label className=" text-base">Preferred Pickup Campus *</Label>
                <Select
                  value={formData.campus}
                  onValueChange={(value) => handleSelectChange("campus", value)}
                >
                  <SelectTrigger className="dark bg-slate-700 border-slate-600 ">
                    <SelectValue placeholder="Select a campus" />
                  </SelectTrigger>
                  <SelectContent className="dark bg-slate-700 border-slate-600">
                    <SelectItem value="kuala-lumpur">
                      Kuala Lumpur Campus
                    </SelectItem>
                    <SelectItem value="penang">Penang Campus</SelectItem>
                    <SelectItem value="johor-bahru">
                      Johor Bahru Campus
                    </SelectItem>
                    <SelectItem value="melaka">Melaka Campus</SelectItem>
                    <SelectItem value="selangor">Selangor Campus</SelectItem>
                  </SelectContent>
                </Select>
                {errors.campus && (
                  <p className="text-red-400 text-sm">{errors.campus}</p>
                )}
              </div>

              {/* T-Shirt Size */}
              <div className="space-y-2">
                <Label className=" text-base">T-Shirt Size *</Label>
                <Select
                  value={formData.tshirtSize}
                  onValueChange={(value) =>
                    handleSelectChange("tshirtSize", value)
                  }
                >
                  <SelectTrigger className="dark bg-slate-700 border-slate-600 ">
                    <SelectValue placeholder="Select your size" />
                  </SelectTrigger>
                  <SelectContent className="dark bg-slate-700 border-slate-600">
                    <SelectItem value="XS">Extra Small (XS)</SelectItem>
                    <SelectItem value="S">Small (S)</SelectItem>
                    <SelectItem value="M">Medium (M)</SelectItem>
                    <SelectItem value="L">Large (L)</SelectItem>
                    <SelectItem value="XL">Extra Large (XL)</SelectItem>
                    <SelectItem value="2XL">2X Large (2XL)</SelectItem>
                    <SelectItem value="3XL">3X Large (3XL)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.tshirtSize && (
                  <p className="text-red-400 text-sm">{errors.tshirtSize}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-700  font-semibold py-3 text-lg rounded-lg transition-colors"
              >
                Claim Your Starter Kit
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

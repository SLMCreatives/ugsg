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
import {
  CheckCircle,
  AlertCircle,
  MapPin,
  Phone,
  Building2
} from "lucide-react";

const newlocations = [
  {
    value: "unitar-international-university-main-campus-petaling-jaya",
    label: "UNITAR International University Main Campus Petaling Jaya",
    address:
      "Tierra Crest, Jalan SS6/3, Kelana Jaya, 47301 Petaling Jaya, Selangor Darul Ehsan",
    phone: "+603-7627 7200"
  },
  {
    value: "unitar-college-sungai-petani",
    label: "UNITAR College Sungai Petani",
    address:
      "No. 77 & 78, Wisma Cosmopoint, Jalan Mawar 1, Taman Pekan Baru, 08000 Sungai Petani, Kedah. Additional Premises: Plot A-G, Jalan Kampung Baru, 08000 Sungai Petani, Kedah",
    phone: "04-425 6061/63"
  },
  {
    value: "unitar-college-penang",
    label: "UNITAR College Penang",
    address:
      "Unit 72-1-46, 72-1-47, 72-2-43, 72-2-43a, 72-2-45, 72-2-46, 72-2-47, 72-2-48, 72-3-47 & 72-3-48, Arena Curve, Jalan Mahsuri, 11950 Bayan Lepas, Pulau Pinang",
    phone: "04-611 0658"
  },
  {
    value: "unitar-college-ipoh",
    label: "UNITAR College Ipoh",
    address:
      "Unit 1-A, 1-B, 3-A, 3-B, 5-A, 5-B, 7-A, 7-B, 9, 9-A, 9-B, 11, 11-A, 11-B, 13, 13-A, 13-B, 15, 15-A, 15-B, Arena Niaga Pari 2, Arena Niaga Pari Off Jalan Silibin, 30100 Ipoh, Perak",
    phone: "05-249 2626/21"
  },
  {
    value: "unitar-college-melaka",
    label: "UNITAR College Melaka",
    address: "No. 112, 114 & 116, Jalan Kubu, 75200 Melaka, Melaka",
    phone: "06-286 0686"
  },
  {
    value: "unitar-college-johor-bahru",
    label: "UNITAR College Johor Bahru",
    address:
      "No. 14, 14A, 14B, 14C, 16, 16A, 16B & 16C, Jalan Lembah 16, Bandar Seri Alam, 81750 Masai, Johor",
    phone: "07-382 4705"
  },
  {
    value: "unitar-college-kuantan",
    label: "UNITAR College Kuantan",
    address:
      "No. 74/4, Jalan Teluk Sisek, 25000 Kuantan, Pahang. New Campus: B92-B98 Jalan Dato Lim Hoe Lek, 25300 Kuantan, Pahang",
    phone: "09-516 2857/59/72"
  },
  {
    value: "unitar-college-kuala-terengganu",
    label: "UNITAR College Kuala Terengganu",
    address:
      "Tingkat 2 dan 3, Kompleks Maksak, Jalan Cerung Lanjut, 20300 Kuala Terengganu, Terengganu",
    phone: "09-631 2223/4"
  },
  {
    value: "unitar-college-kota-bharu",
    label: "UNITAR College Kota Bharu",
    address:
      "No. 5, 6, 7 & 8, Vista Square, Jalan Sri Cemerlang, 15350 Kota Bharu, Kelantan",
    phone: "09-743 7677"
  },
  {
    value: "unitar-college-kuching",
    label: "UNITAR College Kuching",
    address:
      "Lot 3127-3130, PL 1106, Block 10, Kuching Central Land District, Jalan Tun Ahmad Zaidi Adruce, 93250 Kuching, Sarawak",
    phone: "082-240 340"
  },
  {
    value: "unitar-college-kota-kinabalu",
    label: "UNITAR College Kota Kinabalu",
    address:
      "Lot 102, 103, 104 & 105, Block P, Alamesra Plaza Utama, Phase 3, Alamesra, Along Sulaman Coastal, Kuala Menggatal, 88400 Kota Kinabalu, Sabah",
    phone: "088-348 800"
  },
  {
    value: "unitar-university-college-kuala-lumpur",
    label: "UNITAR University College Kuala Lumpur",
    address:
      "01-03, 09-01, 09-02, 09-03, 09-04 & 09-05, Wisma Hong Leong, 18 Jalan Perak, 50450 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur",
    phone: "03-2603 1500"
  }
];

/* const locations = [
  {
    value: "kelana_jaya",
    label: "UNITAR International University, (Main Campus) Petaling Jaya"
  },
  { value: "kuala_lumpur", label: "UNITAR University College Kuala Lumpur" },
  {
    value: "sungai_petani",
    label: "UNITAR College Sungai Petani"
  },
  {
    value: "ipoh",
    label: "UNITAR College Ipoh"
  },
  {
    value: "johor_bharu",
    label: "UNITAR College Johor Bahru"
  },
  {
    value: "kota_bharu",
    label: "UNITAR College Kota Bharu"
  },
  {
    value: "kota_kinabalu",
    label: "UNITAR College Kota Kinabalu"
  },
  {
    value: "kuala_terengganu",
    label: "UNITAR College Kuala Terengganu "
  },
  {
    value: "pulau_pinang",
    label: "UNITAR College Penang"
  },
  {
    value: "melaka",
    label: "UNITAR College Melaka"
  },
  {
    value: "kuching",
    label: "UNITAR College Kuching"
  },
  {
    value: "kuantan",
    label: "UNITAR College Kuantan"
  }
]; */

const getLocationDetails = (value: string) => {
  return newlocations.find((loc) => loc.value === value) || null;
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

  const selectedLocation = getLocationDetails(formData.campus);
  const submittedLocation = submittedData
    ? getLocationDetails(submittedData.campus)
    : null;

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

                  {submittedLocation && (
                    <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-5 space-y-4">
                      <div>
                        <p className="text-sm uppercase tracking-wide text-cyan-600 font-semibold">
                          Your Pickup Location
                        </p>
                        <h3 className="text-lg font-bold mt-1">
                          {submittedLocation.label}
                        </h3>
                      </div>

                      <div className="grid gap-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-cyan-500 mt-0.5 shrink-0" />
                          <div>
                            <p className="font-semibold">Address</p>
                            <p className="mt-1 leading-relaxed">
                              {submittedLocation.address}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Phone className="h-5 w-5 text-cyan-500 mt-0.5 shrink-0" />
                          <div>
                            <p className="font-semibold">Phone Number</p>
                            <p className="mt-1">{submittedLocation.phone}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
                    {newlocations.map((loc) => (
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

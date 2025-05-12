/* eslint-disable react/no-unescaped-entities */
"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import {
  FileText,
  DownloadIcon,
  CalendarCheck,
  ChevronDownCircle,
  ClockIcon,
  MapPin,
  Laptop
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "../ui/card";
import Orvideo from "./orvideo";
import Osupport from "./osupport";
import MsteamsLink from "./teamslink";
import Image from "next/image";
import Link from "next/link";

export default function OnlineBM() {
  return (
    <section
      id="online"
      className="container px-4 py-12 md:px-6 flex self-center"
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Orientasi Atas Talian
          </CardTitle>
          <CardDescription>
            Maklumat untuk pelajar yang menghadiri sesi orientasi atas talian{" "}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="ug-english" className="w-full">
            <TabsList
              className="grid w-full grid-cols-2 md:grid-cols-4"
              defaultValue={"ug-english"}
            >
              <TabsTrigger value="ug-english">Prasiswazah</TabsTrigger>
              {/*                 <TabsTrigger value="ug-bm">Undergraduate BM</TabsTrigger>
               */}{" "}
              <TabsTrigger value="pg-english">Pascasiswazah</TabsTrigger>
              {/* <TabsTrigger value="pg-bm">Postgraduate BM</TabsTrigger> */}
            </TabsList>

            {/* Undergraduate English Tab Content */}
            <TabsContent value="ug-english" className="mt-6 space-y-8">
              {/* Orientation Agenda */}
              <div className="space-y-4">
                <Tabs defaultValue="orientation-english" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                    <TabsTrigger value="orientation-english">
                      Bahasa Inggeris
                    </TabsTrigger>
                    <TabsTrigger value="orientation-bm">
                      Bahasa Melayu
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="orientation-english"
                    className="mt-6 space-y-8"
                  >
                    <div className="flex flex-col gap-3 bg-gray-100 p-4 rounded-lg">
                      <div className="flex flex-col gap-0">
                        <h3 className="text-xl font-semibold">
                          Orientasi Atas Talian - Prasiswazah (ENG)
                        </h3>
                        <p className="italic text-sm text-muted-foreground">
                          Bagi pelajar Sijil, Asasi, Diploma dan Ijazah Muda.
                        </p>
                      </div>
                      <div className="flex flex-row gap-4">
                        <CalendarCheck className="min-h-6 min-w-6 text-yellow-600" />
                        <p className="text-primary">17 Mei 2025 (Sabtu)</p>
                      </div>
                      <div className="flex flex-row gap-4">
                        <ClockIcon className="min-h-6 min-w-6 text-yellow-600" />
                        <p className="text-primary">
                          8:45 pagi - 1:00 tengahari
                        </p>
                      </div>
                      <div className="flex flex-row gap-4">
                        <Laptop className="min-h-6 min-w-6 text-yellow-600" />
                        <p className="text-primary">
                          Microsoft Teams (Atas Talian)
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <h4 className="italic pt-4 flex flex-row gap-4 items-center justify-center">
                        Jadual Orientasi
                        <ChevronDownCircle className="h-5 w-5 text-muted-foreground" />
                      </h4>
                      <Link
                        href="/agenda/o_ug_en.jpg"
                        target="_blank"
                        className="w-full flex flex-col gap-4"
                      >
                        <Image
                          src="/agenda/o_ug_en.jpg"
                          alt="Conventional Orientation Agenda"
                          width={500}
                          height={500}
                          className="w-full h-auto object-contain rounded-lg ring-1 ring-gray-800 drop-shadow-sm hover:drop-shadow-lg transition-all duration-200 ease-in-out"
                        />

                        <Button
                          variant="outline"
                          className="gap-1.5 w-full"
                          size="sm"
                        >
                          <DownloadIcon className="h-4 w-4" /> Muat Turun Jadual
                        </Button>
                      </Link>
                    </div>
                  </TabsContent>
                  <TabsContent
                    value="orientation-bm"
                    className="mt-6 space-y-8"
                  >
                    <div className="flex flex-col gap-3 bg-gray-100 p-4 rounded-lg">
                      <div className="flex flex-col gap-0">
                        <h3 className="text-xl font-semibold">
                          Orientasi Atas Talian - Prasiswazah (BM)
                        </h3>
                        <p className="italic text-sm text-muted-foreground">
                          Bagi pelajar Sijil, Asasi, Diploma dan Ijazah Muda.
                        </p>
                      </div>
                      <div className="flex flex-row gap-4">
                        <CalendarCheck className="min-h-6 min-w-6 text-yellow-600" />
                        <p className="text-primary">17 Mei 2025 (Sabtu)</p>
                      </div>
                      <div className="flex flex-row gap-4">
                        <ClockIcon className="min-h-6 min-w-6 text-yellow-600" />
                        <p className="text-primary">
                          1:30 tengahari - 5:30 petang
                        </p>
                      </div>
                      <div className="flex flex-row gap-4">
                        <Laptop className="min-h-6 min-w-6 text-yellow-600" />
                        <p className="text-primary">
                          Microsoft Teams (Atas Talian)
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <h4 className="italic pt-4 flex flex-row gap-4 items-center justify-center">
                        Jadual Orientasi
                        <ChevronDownCircle className="h-5 w-5 text-muted-foreground" />
                      </h4>
                      <Link
                        href="/agenda/o_ug_bm.jpg"
                        target="_blank"
                        className="w-full flex flex-col gap-4"
                      >
                        <Image
                          src="/agenda/o_ug_bm.jpg"
                          alt="Conventional Orientation Agenda"
                          width={500}
                          height={500}
                          className="w-full h-auto object-contain rounded-lg ring-1 ring-gray-800 drop-shadow-sm hover:drop-shadow-lg transition-all duration-200 ease-in-out"
                        />

                        <Button
                          variant="outline"
                          className="gap-1.5 w-full"
                          size="sm"
                        >
                          <DownloadIcon className="h-4 w-4" /> Muat Turun Jadual
                        </Button>
                      </Link>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* M.Teams Links */}
              <MsteamsLink />

              {/* Online Readiness Video */}
              <Orvideo />
            </TabsContent>

            {/* Postgraduate English Tab Content */}
            <TabsContent value="pg-english" className="mt-6 space-y-8">
              {/* Orientation Agenda */}
              <div className="space-y-4">
                <Tabs defaultValue="orientation-english" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                    <TabsTrigger value="orientation-english">
                      Bahasa Inggeris
                    </TabsTrigger>
                    <TabsTrigger value="orientation-bm">
                      Bahasa Melayu
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="orientation-english"
                    className="mt-6 space-y-8"
                  >
                    <div className="flex flex-col gap-3 bg-gray-100 p-4 rounded-lg">
                      <div className="flex flex-col gap-0">
                        <h3 className="text-xl font-semibold">
                          Orientasi Atas Talian - Pascasiswazah (ENG)
                        </h3>
                        <p className="italic text-sm text-muted-foreground">
                          Bagi pelajar Sarjana & Doktor Falsafah
                        </p>
                      </div>
                      <div className="flex flex-row gap-4">
                        <CalendarCheck className="min-h-6 min-w-6 text-yellow-600" />
                        <p className="text-primary">17 Mei 2025 (Sabtu)</p>
                      </div>
                      <div className="flex flex-row gap-4">
                        <ClockIcon className="min-h-6 min-w-6 text-yellow-600" />
                        <p className="text-primary">
                          10:00 pagi - 12:45 tengahari
                        </p>
                      </div>
                      <div className="flex flex-row gap-4">
                        <Laptop className="min-h-6 min-w-6 text-yellow-600" />
                        <p className="text-primary">
                          Microsoft Teams (Atas Talian)
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <h4 className="italic pt-4 flex flex-row gap-4 items-center justify-center">
                        Jadual Orientasi
                        <ChevronDownCircle className="h-5 w-5 text-muted-foreground" />
                      </h4>
                      <Link
                        href="/agenda/o_pg_en.jpg"
                        target="_blank"
                        className="w-full flex flex-col gap-4"
                      >
                        <Image
                          src="/agenda/o_pg_en.jpg"
                          alt="Conventional Orientation Agenda"
                          width={500}
                          height={500}
                          className="w-full h-auto object-contain rounded-lg ring-1 ring-gray-800 drop-shadow-sm hover:drop-shadow-lg transition-all duration-200 ease-in-out"
                        />

                        <Button
                          variant="outline"
                          className="gap-1.5 w-full"
                          size="sm"
                        >
                          <DownloadIcon className="h-4 w-4" /> Muat Turun Jadual
                        </Button>
                      </Link>
                    </div>
                  </TabsContent>
                  <TabsContent
                    value="orientation-bm"
                    className="mt-6 space-y-8"
                  >
                    <div className="flex flex-col gap-3 bg-gray-100 p-4 rounded-lg">
                      <div className="flex flex-col gap-0">
                        <h3 className="text-xl font-semibold">
                          Orientasi Atas Talian - Pascasiswazah (BM)
                        </h3>
                        <p className="italic text-sm text-muted-foreground">
                          Bagi pelajar Sarjana & Doktor Falsafah
                        </p>
                      </div>
                      <div className="flex flex-row gap-4">
                        <CalendarCheck className="min-h-6 min-w-6 text-yellow-600" />
                        <p className="text-primary">17 Mei 2025 (Sabtu)</p>
                      </div>
                      <div className="flex flex-row gap-4">
                        <ClockIcon className="min-h-6 min-w-6 text-yellow-600" />
                        <p className="text-primary">
                          1:30 tengahari - 4:30 petang
                        </p>
                      </div>
                      <div className="flex flex-row gap-4">
                        <Laptop className="min-h-6 min-w-6 text-yellow-600" />
                        <p className="text-primary">
                          Microsoft Teams (Atas Talian)
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <h4 className="italic pt-4 flex flex-row gap-4 items-center justify-center">
                        Jadual Orientasi
                        <ChevronDownCircle className="h-5 w-5 text-muted-foreground" />
                      </h4>
                      <Link
                        href="/agenda/o_pg_bm.jpg"
                        target="_blank"
                        className="w-full flex flex-col gap-4"
                      >
                        <Image
                          src="/agenda/o_pg_bm.jpg"
                          alt="Conventional Orientation Agenda"
                          width={500}
                          height={500}
                          className="w-full h-auto object-contain rounded-lg ring-1 ring-gray-800 drop-shadow-sm hover:drop-shadow-lg transition-all duration-200 ease-in-out"
                        />

                        <Button
                          variant="outline"
                          className="gap-1.5 w-full"
                          size="sm"
                        >
                          <DownloadIcon className="h-4 w-4" /> Muat Turun Jadual
                        </Button>
                      </Link>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* M.Teams Links */}
              <MsteamsLink />

              {/* Online Readiness Video */}
              <Orvideo />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}

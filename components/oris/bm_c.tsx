"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import {
  FileText,
  DownloadIcon,
  CalendarCheck,
  ClockIcon,
  MapIcon,
  MapPin,
  ChevronRightCircle,
  ChevronDownCircle
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "../ui/card";
import GetToCampus from "./bm_gettocampus";
import Restaurants from "./bm_restaurants";
import Image from "next/image";
import Location from "./bm_location";
import Link from "next/link";

export default function ConventionalBM() {
  return (
    <section
      id="conventional"
      className="container px-4 py-12 md:px-6 flex self-center"
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Sesi Orientasi Bersemuka
          </CardTitle>
          <CardDescription>
            Maklumat untuk pelajar yang menghadiri orientasi secara bersemuka di
            Kampus Utama (Kelana Jaya).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="undergraduate" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="undergraduate">Prasiswazah</TabsTrigger>
              <TabsTrigger value="postgraduate">Pascasiswazah</TabsTrigger>
            </TabsList>

            {/* Undergraduate Tab Content */}
            <TabsContent value="undergraduate" className="mt-6 space-y-8">
              {/* Orientation Agenda */}
              <div className="space-y-4">
                <div className="flex flex-col gap-3 bg-gray-100 p-4 rounded-lg">
                  <div className="flex flex-col gap-0">
                    <h3 className="text-xl font-semibold">
                      Sesi Orientasi Prasiswazah
                    </h3>
                    <p className="italic text-sm text-muted-foreground">
                      Bagi pelajar Sijil, Asasi, Diploma & Ijazah Muda
                    </p>
                  </div>
                  <div className="flex flex-row gap-4">
                    <CalendarCheck className="min-h-6 min-w-6 text-yellow-600" />
                    <p className="text-primary">
                      15 & 16 Mei 2025 (Khamis & Jumaat)
                    </p>
                  </div>
                  <div className="flex flex-row gap-4">
                    <ClockIcon className="min-h-6 min-w-6 text-yellow-600" />
                    <p className="text-primary">8:30 pagi - 6:00 petang</p>
                  </div>
                  <div className="flex flex-row gap-4">
                    <MapPin className="min-h-6 min-w-6 text-yellow-600" />
                    <p className="text-primary">
                      Auditorioum, Tingkat 2, Universiti Antarabangsa UNITAR
                      (Main Campus)
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="italic pt-4 flex flex-row gap-4 items-center justify-center">
                    Jadual Sesi Orientasi
                    <ChevronDownCircle className="h-5 w-5 text-muted-foreground" />
                  </h4>
                  <Link
                    href="/agenda/c_ug.jpg"
                    target="_blank"
                    className="w-full flex flex-col gap-4"
                  >
                    <Image
                      src="/agenda/c_ug.jpg"
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
              </div>

              {/* Campus Location */}
              <Location />

              {/* How to get to campus */}
              <GetToCampus />

              {/* Close Restaurants */}
              <Restaurants />
            </TabsContent>

            {/* Postgraduate Tab Content */}
            <TabsContent value="postgraduate" className="mt-6 space-y-8">
              {/* Orientation Agenda */}
              <div className="space-y-4">
                <div className="flex flex-col gap-3 bg-gray-100 p-4 rounded-lg">
                  <div className="flex flex-col gap-0">
                    <h3 className="text-xl font-semibold">
                      Sesi Orientasi Prasiswazah
                    </h3>
                    <p className="italic text-sm text-muted-foreground">
                      Bagi Ijazah Sarjana & PhD
                    </p>
                  </div>
                  <div className="flex flex-row gap-4">
                    <CalendarCheck className="min-h-6 min-w-6 text-yellow-600" />
                    <p className="text-primary">15 Mei 2025 (Khamis)</p>
                  </div>
                  <div className="flex flex-row gap-4">
                    <ClockIcon className="min-h-6 min-w-6 text-yellow-600" />
                    <p className="text-primary">8:30 pagi - 1:00 petang</p>
                  </div>
                  <div className="flex flex-row gap-4">
                    <MapPin className="min-h-6 min-w-6 text-yellow-600" />
                    <p className="text-primary">
                      Student Graduate Lounge, Tingkat 2, Universiti
                      Antarabangsa UNITAR (Main Campus)
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="italic pt-4 flex flex-row gap-4 items-center justify-center">
                    Jadual Sesi Orientasi
                    <ChevronDownCircle className="h-5 w-5 text-muted-foreground" />
                  </h4>
                  <Link
                    href="/agenda/c_pg.jpg"
                    target="_blank"
                    className="w-full flex flex-col gap-4"
                  >
                    <Image
                      src="/agenda/c_pg.jpg"
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
              </div>

              {/* Campus Location */}
              <Location />

              {/* How to get to campus */}
              <GetToCampus />

              {/* Close Restaurants */}
              <Restaurants />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}

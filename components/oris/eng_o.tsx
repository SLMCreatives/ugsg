/* eslint-disable react/no-unescaped-entities */
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
import GetToCampus from "./gettocampus";
import Restaurants from "./restaurants";
import Image from "next/image";
import Location from "./location";
import Link from "next/link";

export default function ConventionalENG() {
  return (
    <section
      id="conventional"
      className="container px-4 py-12 md:px-6 flex self-center"
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Physical Orientation
          </CardTitle>
          <CardDescription>
            Information for students attending in-person orientation at our Main
            Campus (Kelana Jaya).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="undergraduate" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="undergraduate">Undergraduate</TabsTrigger>
              <TabsTrigger value="postgraduate">Postgraduate</TabsTrigger>
            </TabsList>

            {/* Undergraduate Tab Content */}
            <TabsContent value="undergraduate" className="mt-6 space-y-8">
              {/* Orientation Agenda */}
              <div className="space-y-4">
                <div className="flex flex-col gap-3 bg-gray-100 p-4 rounded-lg">
                  <div className="flex flex-col gap-0">
                    <h3 className="text-xl font-semibold">
                      Undergraduate Orientation
                    </h3>
                    <p className="italic text-sm text-muted-foreground">
                      For Certificate, Foundation, Diploma & Bachelor's students
                    </p>
                  </div>
                  <div className="flex flex-row gap-4">
                    <CalendarCheck className="min-h-6 min-w-6 text-yellow-600" />
                    <p className="text-primary">
                      15 & 16 May 2025 (Thursday & Friday)
                    </p>
                  </div>
                  <div className="flex flex-row gap-4">
                    <ClockIcon className="min-h-6 min-w-6 text-yellow-600" />
                    <p className="text-primary">8:30 am - 6:00 pm</p>
                  </div>
                  <div className="flex flex-row gap-4">
                    <MapPin className="min-h-6 min-w-6 text-yellow-600" />
                    <p className="text-primary">
                      Auditorioum, Level 2, UNITAR International University
                      (Main Campus)
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="italic pt-4 flex flex-row gap-4 items-center justify-center">
                    Orientation Schedule
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
                      <DownloadIcon className="h-4 w-4" /> Download Schedule
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
                      Postgraduate Orientation
                    </h3>
                    <p className="italic text-sm text-muted-foreground">
                      For Master's and Doctorate students
                    </p>
                  </div>
                  <div className="flex flex-row gap-4">
                    <CalendarCheck className="min-h-6 min-w-6 text-yellow-600" />
                    <p className="text-primary">15 May 2025</p>
                  </div>
                  <div className="flex flex-row gap-4">
                    <ClockIcon className="min-h-6 min-w-6 text-yellow-600" />
                    <p className="text-primary">8:30 am - 1:00 pm</p>
                  </div>
                  <div className="flex flex-row gap-4">
                    <MapPin className="min-h-6 min-w-6 text-yellow-600" />
                    <p className="text-primary">
                      Student Graduate Lounge, Level 2, UNITAR International
                      University (Main Campus)
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="italic pt-4 flex flex-row gap-4 items-center justify-center">
                    Orientation Schedule
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
                      <DownloadIcon className="h-4 w-4" /> Download Schedule
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

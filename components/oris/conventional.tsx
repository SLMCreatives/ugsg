"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { FileText, DownloadIcon } from "lucide-react";
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

export default function Conventional() {
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
            Information for students attending conventional (physical) course at
            our main campus @Kelana Jaya.
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
                <div className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-semibold">
                      Undergraduate Agenda
                    </h3>
                  </div>
                  <Button variant="default" className="gap-1.5" size="sm">
                    <Link href="/agenda/c_ug.jpg" target="_blank">
                      <DownloadIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <Image
                  src="/agenda/c_ug.jpg"
                  alt="Conventional Orientation Agenda"
                  width={500}
                  height={500}
                  className="w-full h-auto object-contain rounded-lg"
                />
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
                <div className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-semibold">
                      Postgraduate Agenda
                    </h3>
                  </div>
                  <Button variant="default" className="gap-1.5" size="sm">
                    <Link href="/agenda/c_pg.jpg" target="_blank">
                      <DownloadIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <Image
                  src="/agenda/c_pg.jpg"
                  alt="Conventional Orientation Agenda"
                  width={500}
                  height={500}
                  className="w-full h-auto object-contain rounded-lg"
                />
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

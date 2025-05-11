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
import Orvideo from "./orvideo";
import Osupport from "./osupport";
import MsteamsLink from "./teamslink";
import Image from "next/image";
import Link from "next/link";

export default function Online() {
  return (
    <section
      id="online"
      className="container px-4 py-12 md:px-6 flex self-center"
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Online Orientation
          </CardTitle>
          <CardDescription>
            Information for students attending virtual orientation sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="ug-english" className="w-full">
            <TabsList
              className="grid w-full grid-cols-2 md:grid-cols-4"
              defaultValue={"ug-english"}
            >
              <TabsTrigger value="ug-english">Undergraduate</TabsTrigger>
              {/*                 <TabsTrigger value="ug-bm">Undergraduate BM</TabsTrigger>
               */}{" "}
              <TabsTrigger value="pg-english">Postgradaute</TabsTrigger>
              {/* <TabsTrigger value="pg-bm">Postgraduate BM</TabsTrigger> */}
            </TabsList>

            {/* Undergraduate English Tab Content */}
            <TabsContent value="ug-english" className="mt-6 space-y-8">
              {/* Orientation Agenda */}
              <div className="space-y-4">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-semibold">Agenda</h3>
                  </div>
                </div>
                <Tabs defaultValue="orientation-english" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                    <TabsTrigger value="orientation-english">
                      English
                    </TabsTrigger>
                    <TabsTrigger value="orientation-bm">
                      Bahasa Melayu
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="orientation-english"
                    className="mt-6 space-y-8"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row justify-between items-center">
                        <p className="font-bold">English Orientation</p>
                        <Button variant="default" className="gap-1.5" size="sm">
                          <Link href="/agenda/o_ug_en.jpg" target="_blank">
                            <DownloadIcon className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                      <Image
                        src="/agenda/o_ug_en.jpg"
                        alt="Conventional Orientation Agenda"
                        width={500}
                        height={500}
                        className="w-full h-auto object-contain rounded-lg"
                      />
                    </div>
                  </TabsContent>
                  <TabsContent
                    value="orientation-bm"
                    className="mt-6 space-y-8"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row justify-between items-center">
                        <p className="font-bold">
                          Sesi Orientasi Bahasa Melayu
                        </p>
                        <Button variant="default" className="gap-1.5" size="sm">
                          <Link href="/agenda/o_ug_bm.jpg" target="_blank">
                            <DownloadIcon className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                      <Image
                        src="/agenda/o_ug_bm.jpg"
                        alt="Conventional Orientation Agenda"
                        width={500}
                        height={500}
                        className="w-full h-auto object-contain rounded-lg"
                      />
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
                <div className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-semibold">Agenda</h3>
                  </div>
                </div>
                <Tabs defaultValue="orientation-english" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                    <TabsTrigger value="orientation-english">
                      English
                    </TabsTrigger>
                    <TabsTrigger value="orientation-bm">
                      Bahasa Melayu
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="orientation-english"
                    className="mt-6 space-y-8"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row justify-between items-center">
                        <p className="font-bold">English Onboarding</p>
                        <Button variant="default" className="gap-1.5" size="sm">
                          <Link href="/agenda/o_pg_en.jpg" target="_blank">
                            <DownloadIcon className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                      <Image
                        src="/agenda/o_pg_en.jpg"
                        alt="Conventional Orientation Agenda"
                        width={500}
                        height={500}
                        className="w-full h-auto object-contain rounded-lg"
                      />
                    </div>
                  </TabsContent>
                  <TabsContent
                    value="orientation-bm"
                    className="mt-6 space-y-8"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row justify-between items-center">
                        <p className="font-bold">
                          Sesi Orientasi Bahasa Melayu
                        </p>
                        <Button variant="default" className="gap-1.5" size="sm">
                          <Link href="/agenda/o_pg_bm.jpg" target="_blank">
                            <DownloadIcon className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                      <Image
                        src="/agenda/o_pg_bm.jpg"
                        alt="Conventional Orientation Agenda"
                        width={500}
                        height={500}
                        className="w-full h-auto object-contain rounded-lg"
                      />
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

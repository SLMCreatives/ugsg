"use client";

/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, MessagesSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Conventional from "@/components/oris/conventional";
import Online from "@/components/oris/online";
import { useState } from "react";
import OnlineBM from "@/components/oris/online_bm";
import ConventionalBM from "@/components/oris/bm_c";

export default function OrientationDetails() {
  const [orient, serOrient] = useState("conventional");
  return (
    <div className="flex min-h-screen flex-col w-full">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full mx-auto border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-8 mx-auto">
          <div className="mr-4 flex items-center">
            <Image
              src="/logo_unitar.png"
              width={40}
              height={40}
              alt="UNITAR Logo"
              className="mr-2 w-36 h-28 rounded-full object-cover"
            />
            <span className="hidden font-bold sr-only sm:inline-block">
              UNITAR International University
            </span>
          </div>
          <nav className="flex flex-1 items-center justify-end space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/bm">Panduan Bermula</Link>
            </Button>
            <Link href="/orientation/eng">
              <Button size="sm" variant="ghost" className="p-0 font-bold">
                <Image
                  src="/eng.png"
                  width={20}
                  height={20}
                  alt="English"
                  className="w-auto max-h-6"
                />
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 min-h-[50vh] md:py-16 lg:py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 items-center justify-center flex px-6 lg:px-0">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Butiran Hari Orientasi
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Semua yang anda perlu tahu tentang orientasi anda yang akan
                  datang di Universiti Antarabangsa UNITAR.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="sm"
                  className="gap-1.5"
                  variant={orient === "conventional" ? "default" : "outline"}
                  onClick={() => serOrient("conventional")}
                >
                  Orientasi Fizikal
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={orient === "online" ? "default" : "outline"}
                  className="gap-1.5"
                  onClick={() => serOrient("online")}
                >
                  Orientasi Atas Talian
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Image
              src={
                orient === "conventional" ? "/unitarmc.png" : "/onlinehero.jpg"
              }
              width={550}
              height={550}
              alt="Orientation Day"
              className="mx-auto order-first md:order-last aspect-video overflow-hidden rounded-xl object-cover object-bottom sm:w-full "
            />
          </div>
        </div>
      </section>

      {/* Conventional Orientation Section */}
      {orient === "conventional" && <ConventionalBM />}

      {/* Online Orientation Section */}
      {orient === "online" && <OnlineBM />}

      {/* Help & Support Section */}
      <section id="help" className="w-full py-12 md:py-16 lg:py-20 bg-muted/30">
        <div className="container px-4 md:px-6 self-center mx-auto">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Help & Support
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground text-balance sm:text-lg sm:leading-7">
              If you have any issues or queries, please reach out to us via:
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-md flex flex-row flex-wrap gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  Dedicated UNITAR Personnels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-2">
                  <MessagesSquare className="h-5 w-5 text-primary" />
                  <p className="font-medium">WhatsApp</p>
                </div>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Their WhatsApp contact details are available in the Welcome
                  Email sent to your personal email.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Direct Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <p className="font-medium">admission@unitar.my</p>
                </div>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  For urgent matters or if you cannot access the One Stop
                  Centre, please email us directly.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="mailto:admission@unitar.my">Send Email</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t bg-background py-6 mx-auto">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row mx-auto">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} UNITAR International University.
            All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

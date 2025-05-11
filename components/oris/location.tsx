"use client";

import { MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";

export default function Location() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <MapPin className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-semibold">Campus Location</h3>
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium">UNITAR International University</h4>
              <p className="text-muted-foreground">
                Tierra Crest, Jalan SS 6/3, <br></br>47301 Petaling Jaya,
                Selangor
              </p>
              <Button variant="default" className="mt-2" asChild>
                <Link
                  href="https://maps.app.goo.gl/D2kGnaxUwZ4QHtmM6"
                  target="_blank"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  View on Google Maps
                </Link>
              </Button>
            </div>
            <div className="rounded-lg border overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.979956159145!2d101.60025440000003!3d3.099985300000009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4c79abb67e89%3A0xff73acfabbd2e31c!2sUNITAR%20International%20University!5e0!3m2!1sen!2smy!4v1746997643459!5m2!1sen!2smy"
                width="600"
                height="450"
                allowFullScreen
                loading="lazy"
                className="w-full h-auto aspect-video"
              ></iframe>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

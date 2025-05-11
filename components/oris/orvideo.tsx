import { Video } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";

export default function Orvideo() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Video className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-semibold">Online Readiness Video</h3>
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="aspect-video rounded-lg border bg-muted flex items-center justify-center">
              <div className="text-center p-4">
                <Video className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">
                  Online Readiness Video Preview
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">
                Prepare for Online Learning Success
              </h4>
              <p className="text-sm text-muted-foreground">
                Watch this comprehensive video guide to prepare for your online
                learning journey at UNITAR. The video covers:
              </p>
              <ul className="ml-6 list-disc space-y-1 text-sm">
                <li>Setting up your study space for online learning</li>
                <li>Using Microsoft Teams effectively for classes</li>
                <li>Navigating CourseNetworking (CN) platform</li>
                <li>Online etiquette and best practices</li>
                <li>Time management for online students</li>
              </ul>
              <Button className="mt-2" asChild>
                <Link href="#">
                  <Video className="mr-2 h-4 w-4" />
                  Watch Video
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

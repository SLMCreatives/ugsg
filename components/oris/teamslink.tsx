/* eslint-disable react/no-unescaped-entities */
import { LinkIcon, AlertCircle } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";

export default function MsteamsLinkBM() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <LinkIcon className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-semibold">M.Teams Links</h3>
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-1 min-h-5 min-w-5 text-amber-600" />
                <div>
                  <h4 className="font-medium text-amber-800">Important Note</h4>
                  <p className="mt-1 text-sm text-amber-700">
                    Microsoft Teams links will be sent to your UNITAR student
                    email 24 hours before the orientation. Please ensure you
                    have activated your student account and can access your
                    email.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">How to Find Your Teams Links:</h4>
              <ol className="ml-6 list-decimal space-y-2">
                <li>
                  Log in to your UNITAR student email at{" "}
                  <Link
                    href="https://outlook.office.com"
                    className="text-primary underline"
                    target="_blank"
                  >
                    outlook.office.com
                  </Link>
                </li>
                <li>
                  Look for an email with the subject "UNITAR Orientation Day -
                  Teams Links"
                </li>
                <li>
                  Click on the Teams meeting link for each session as per the
                  schedule
                </li>
                <li>
                  Alternatively, you can access the Teams links through your
                  CourseNetworking (CN) portal in the Student Resource Backpack
                </li>
              </ol>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Technical Requirements:</h4>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  Stable internet connection (minimum 5 Mbps download/upload)
                </li>
                <li>Computer with webcam and microphone</li>
                <li>
                  Microsoft Teams app installed (recommended) or access via web
                  browser
                </li>
                <li>Headphones or earphones for better audio quality</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

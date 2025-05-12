/* eslint-disable react/no-unescaped-entities */
import { LinkIcon, AlertCircle } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";

export default function MsteamsLink() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <LinkIcon className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-semibold">Pautan Microsoft Teams</h3>
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-1 min-h-5 min-w-5 text-amber-600" />
                <div>
                  <h4 className="font-medium text-amber-800">Nota Penting</h4>
                  <p className="mt-1 text-sm text-amber-700">
                    Pautan 'Microsoft Teams' akan dihantar kepada emel UNITAR
                    anda 24 jam sebelum orientasi. Sila pastikan anda telah
                    mengaktifkan akaun pelajar anda dan boleh mengakses akaun
                    anda emel.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">
                Cara Mencari Pautan 'Teams' Anda:
              </h4>
              <ol className="ml-6 list-decimal space-y-2">
                <li>
                  Log masuk ke e-mel pelajar UNITAR anda di{" "}
                  <Link
                    href="https://outlook.office.com"
                    className="text-primary underline"
                    target="_blank"
                  >
                    outlook.office.com
                  </Link>
                </li>
                <li>
                  Cari e-mel dengan subjek "Hari Orientasi UNITAR - Pautan
                  Teams"
                </li>
                <li>
                  Klik pada pautan 'Teams' untuk setiap sesi mengikut jadual
                  anda.
                </li>
                <li>
                  Sebagai alternatif, anda boleh mengakses pautan 'Teams'
                  melalui anda portal CourseNetworking (CN) dalam Student
                  Resource Backpack (SRB).
                </li>
              </ol>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Keperluan Teknikal:</h4>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  Sambungan Internet yang stabil (muat turun/muat naik minimum
                  10 Mbps)
                </li>
                <li>Komputer atau laptop dengan kamera web dan mikrofon</li>
                <li>
                  App Microsoft Teams dipasang atau akses melalui 'web browser'
                </li>
                <li>
                  'Headphones' atau 'earphones' untuk kualiti audio yang lebih
                  baik
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

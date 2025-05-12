import { Navigation } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function GetToCampus() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Navigation className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-semibold">Cara datang ke Kampus UNITAR</h3>
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <h4 className="font-semibold">Dengan Pengangkutan Awam</h4>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <span className="font-medium">LRT:</span> Naik Kelana Jaya
                  Laluan ke Stesen Taman Bahagia. Kampus ini berjarak 10 minit
                  berjalan kaki dari stesen.
                </li>
                <li>
                  <span className="font-medium">Bus:</span> RapidKL buses 700,
                  701, and 703 stop near the campus.
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Dengan Kereta</h4>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <span className="font-medium">Dari Kuala Lumpur:</span> Ambil
                  Lebuhraya Persekutuan menghala ke Petaling Jaya. Keluar di
                  Kelana Jaya dan ikuti papan tanda ke SS6/3.
                </li>
                <li>
                  <span className="font-medium">Dari Subang:</span> Ambil NKVE
                  dan keluar di Damansara. Ikut papan tanda ke Kelana Jaya dan
                  kemudian ke SS6/3.
                </li>
                <li>
                  <span className="font-medium">Parkir:</span> Berada di Aras
                  Bawah Tanah.
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Dengan Perkongsian Tunggangan</h4>
              <p>
                Perkhidmatan Grab dan perkongsian perjalanan yang lain tersedia.
                Tetapkan destinasi anda ke UNITAR International University,
                Tierra Crest, Kelana Jaya.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

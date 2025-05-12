import { Coffee } from "lucide-react";
import { Card, CardContent } from "../ui/card";

/* eslint-disable react/no-unescaped-entities */
export default function Restaurants() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Coffee className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-semibold">Kedai Makan Terdekat</h3>
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <h4 className="font-semibold">Paradigm Mall (5 minit)</h4>
              <ul className="ml-6 list-disc space-y-1 text-sm">
                <li>Food Republic (Food Court)</li>
                <li>Nando's</li>
                <li>Sushi King</li>
                <li>Secret Recipe</li>
                <li>And banyak pilihan lagi</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Dalam Jarak Berjalan</h4>
              <ul className="ml-6 list-disc space-y-1 text-sm">
                <li>UNITAR Cafeteria (2nd Floor)</li>
                <li>ZUS Coffee</li>
                <li>Restoran Al-Fariz Maju</li>
                <li>Ayam Gepuk</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Kawasan Kelana Jaya</h4>
              <ul className="ml-6 list-disc space-y-1 text-sm">
                <li>Murni Discovery</li>
                <li>McDonald's (Drive-thru available)</li>
                <li>KFC</li>
                <li>Mohd Chan Restaurant</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

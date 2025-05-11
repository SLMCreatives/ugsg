import { Navigation } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function GetToCampus() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Navigation className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-semibold">How to get to campus</h3>
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <h4 className="font-semibold">By Public Transport</h4>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <span className="font-medium">LRT:</span> Take the Kelana Jaya
                  Line to Kelana Jaya Station. The campus is a 10-minute walk
                  from the station.
                </li>
                <li>
                  <span className="font-medium">Bus:</span> RapidKL buses 700,
                  701, and 703 stop near the campus.
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">By Car</h4>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <span className="font-medium">From Kuala Lumpur:</span> Take
                  the Federal Highway towards Petaling Jaya. Exit at Kelana Jaya
                  and follow signs to SS6/3.
                </li>
                <li>
                  <span className="font-medium">From Subang:</span> Take the
                  NKVE and exit at Damansara. Follow signs to Kelana Jaya and
                  then to SS6/3.
                </li>
                <li>
                  <span className="font-medium">Parking:</span> Available at
                  Basement Level.
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">By Ride-Sharing</h4>
              <p>
                Grab and other ride-sharing services are readily available. Set
                your destination to UNITAR International University, Tierra
                Crest, Kelana Jaya.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

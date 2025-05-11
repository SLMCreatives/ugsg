import { HeadphonesIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";

export default function Osupport() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <HeadphonesIcon className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-semibold">Online Support System</h3>
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-medium">Technical Support</h4>
                <p className="text-sm text-muted-foreground">
                  For issues with Microsoft Teams, CourseNetworking, or other
                  technical problems:
                </p>
                <ul className="ml-6 list-disc space-y-1 text-sm">
                  <li>
                    Email:{" "}
                    <span className="font-medium">itsupport@unitar.my</span>
                  </li>
                  <li>
                    Helpline:{" "}
                    <span className="font-medium">
                      +603-7627-7200 (Ext. 777)
                    </span>
                  </li>
                  <li>Live Chat: Available on the Student Dashboard</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Academic Support</h4>
                <p className="text-sm text-muted-foreground">
                  For questions about your research, assignments, or academic
                  matters:
                </p>
                <ul className="ml-6 list-disc space-y-1 text-sm">
                  <li>
                    Email:{" "}
                    <span className="font-medium">pgacademic@unitar.my</span>
                  </li>
                  <li>
                    Contact your Program Coordinator or Research Supervisor
                    (details will be shared during orientation)
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Research Support</h4>
              <p className="text-sm text-muted-foreground">
                For assistance with research methodology, data analysis, and
                academic writing:
              </p>
              <ul className="ml-6 list-disc space-y-1 text-sm">
                <li>
                  Research Methodology Workshops: Schedule will be shared during
                  orientation
                </li>
                <li>
                  Online Library Resources: Access through your Student
                  Dashboard
                </li>
                <li>
                  Academic Writing Support: Available through the Graduate
                  School
                </li>
              </ul>
              <div className="mt-2">
                <Button variant="outline" asChild>
                  <Link href="https://auth.unitar.my/">
                    Access Research Resources
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

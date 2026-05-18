"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardCheck, GraduationCap, Layers, BookA } from "lucide-react";

const academicModules = [
  { title: "Classes", description: "Manage classes, streams, and class teachers", href: "/dashboard/academics/classes", icon: Layers },
  { title: "Subjects", description: "CBC learning areas and 8-4-4 subjects", href: "/dashboard/academics/subjects", icon: BookA },
  { title: "Exams", description: "Create exams, record scores, compute grades", href: "/dashboard/academics/exams", icon: ClipboardCheck },
  { title: "CBC Assessments", description: "Strands, competencies, and performance levels", href: "/dashboard/academics/cbc", icon: GraduationCap },
];

export default function AcademicsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Academics</h1>
        <p className="text-muted-foreground">Manage curriculum, classes, exams, and assessments</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {academicModules.map((mod) => {
          const Icon = mod.icon;
          return (
            <Link key={mod.href} href={mod.href}>
              <Card className="h-full transition-colors hover:border-green-300 hover:bg-green-50/50">
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-700 mb-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">{mod.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{mod.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

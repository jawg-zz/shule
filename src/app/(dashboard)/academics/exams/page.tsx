"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, BarChart3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const exams = [
  { id: 1, name: "End Term 1 Exam 2026", class: "Grade 4 East", type: "END_TERM", date: "2026-03-28", status: "Completed" },
  { id: 2, name: "Mid Term 2 Exam 2026", class: "Form 2 Science", type: "MID_TERM", date: "2026-06-10", status: "Ongoing" },
  { id: 3, name: "CAT 1 2026", class: "Grade 5 West", type: "CAT", date: "2026-02-15", status: "Completed" },
  { id: 4, name: "KCSE Trial 2026", class: "Form 4 Combined", type: "KCSE_TRIAL", date: "2026-07-15", status: "Upcoming" },
  { id: 5, name: "KPSEA Simulation", class: "Grade 6 CBC", type: "KPSEA", date: "2026-09-01", status: "Upcoming" },
];

const kcseGradeScale = [
  { grade: "A", points: 12, range: "80-100" },
  { grade: "A-", points: 11, range: "75-79" },
  { grade: "B+", points: 10, range: "70-74" },
  { grade: "B", points: 9, range: "65-69" },
  { grade: "B-", points: 8, range: "60-64" },
  { grade: "C+", points: 7, range: "55-59" },
  { grade: "C", points: 6, range: "50-54" },
  { grade: "C-", points: 5, range: "45-49" },
  { grade: "D+", points: 4, range: "40-44" },
  { grade: "D", points: 3, range: "35-39" },
  { grade: "D-", points: 2, range: "30-34" },
  { grade: "E", points: 1, range: "0-29" },
];

export default function ExamsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Exams</h1>
          <p className="text-muted-foreground">Create exams, record scores, and compute grades</p>
        </div>
        <Button className="bg-green-700 hover:bg-green-800">
          <Plus className="mr-2 h-4 w-4" /> New Exam
        </Button>
      </div>

      <Tabs defaultValue="exams">
        <TabsList>
          <TabsTrigger value="exams">Exams</TabsTrigger>
          <TabsTrigger value="grading">KCSE Grading Scale</TabsTrigger>
        </TabsList>

        <TabsContent value="exams">
          <Card>
            <CardHeader><CardTitle>All Exams (2026)</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exam Name</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exams.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell className="font-medium">{exam.name}</TableCell>
                      <TableCell>{exam.class}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{exam.type.replace("_", " ")}</Badge>
                      </TableCell>
                      <TableCell>{exam.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            exam.status === "Completed" ? "success" :
                            exam.status === "Ongoing" ? "warning" : "secondary"
                          }
                        >
                          {exam.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <BarChart3 className="h-4 w-4 mr-1" /> Results
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grading">
          <Card>
            <CardHeader><CardTitle>KCSE Grading Scale (12-point system)</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow><TableHead>Grade</TableHead><TableHead>Points</TableHead><TableHead>Raw Score %</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                  {kcseGradeScale.map((g) => (
                    <TableRow key={g.grade}>
                      <TableCell className="font-bold">{g.grade}</TableCell>
                      <TableCell>{g.points}</TableCell>
                      <TableCell>{g.range}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <p className="mt-4 text-sm text-muted-foreground">
                Mean grade is calculated from the best 7 subjects. Total points range: 1-84.
                University entry minimum: C+ (7 points).
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

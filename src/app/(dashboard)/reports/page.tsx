"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart3, FileText, TrendingUp, Download, Printer } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const reportTypes = [
  { title: "Academic Reports", description: "Class performance, exam analysis, grade distributions", icon: BarChart3 },
  { title: "Fee Reports", description: "Collection status, outstanding balances, revenue analysis", icon: TrendingUp },
  { title: "Enrollment Reports", description: "Student numbers by class, gender, and trends", icon: FileText },
  { title: "Attendance Reports", description: "Daily/monthly attendance rates and patterns", icon: FileText },
];

const academicReports = [
  { name: "End Term 1 Performance Summary", class: "All Classes", type: "Summary", date: "2026-04-02", status: "Ready" },
  { name: "Grade 4 East — Mid Term Analysis", class: "Grade 4 East", type: "Detailed", date: "2026-06-10", status: "Generating" },
  { name: "Form 4 KCSE Trial Results", class: "Form 4 Combined", type: "KCSE Analysis", date: "2026-07-15", status: "Pending" },
  { name: "CBC Competency Report — Grade 6", class: "Grade 6 CBC", type: "CBC Report", date: "2026-03-28", status: "Ready" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-muted-foreground">Generate and view school reports</p>
      </div>

      <Tabs defaultValue="academic">
        <TabsList>
          <TabsTrigger value="academic">Academic Reports</TabsTrigger>
          <TabsTrigger value="financial">Financial Reports</TabsTrigger>
          <TabsTrigger value="analytics">AI Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="academic" className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reportTypes.map((rt) => {
              const Icon = rt.icon;
              return (
                <Card key={rt.title} className="cursor-pointer hover:border-green-300 transition-colors">
                  <CardContent className="p-4">
                    <Icon className="h-8 w-8 text-green-700 mb-2" />
                    <h3 className="font-semibold text-sm">{rt.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{rt.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader><CardTitle>Recent Reports</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow><TableHead>Report Name</TableHead><TableHead>Class</TableHead><TableHead>Type</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                  {academicReports.map((r) => (
                    <TableRow key={r.name}>
                      <TableCell className="font-medium">{r.name}</TableCell>
                      <TableCell>{r.class}</TableCell>
                      <TableCell><Badge variant="secondary">{r.type}</Badge></TableCell>
                      <TableCell>{r.date}</TableCell>
                      <TableCell>
                        <Badge variant={r.status === "Ready" ? "success" : r.status === "Generating" ? "warning" : "secondary"}>{r.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon"><Printer className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-green-600" /> Predictive Analytics</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4">
                  <p className="font-medium">At-Risk Students</p>
                  <p className="text-sm text-muted-foreground">3 students predicted to score below C+ in KCSE</p>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm"><span>Peter Kamau (Grade 6)</span><Badge variant="warning">Risk: High</Badge></div>
                    <div className="flex justify-between text-sm"><span>David Otieno (Form 4)</span><Badge variant="warning">Risk: Medium</Badge></div>
                    <div className="flex justify-between text-sm"><span>Esther Akoth (Form 3)</span><Badge variant="secondary">Risk: Low</Badge></div>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="font-medium">Fee Default Prediction</p>
                  <p className="text-sm text-muted-foreground">5 students likely to default on Term 2 fees</p>
                  <div className="mt-2 flex justify-between text-sm">
                    <span>Total at risk:</span>
                    <span className="font-bold text-red-600">KES 175,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Performance Insights</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4">
                  <p className="font-medium">Strongest Subjects</p>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between"><span>Science</span><span className="text-green-600">B+ (Avg)</span></div>
                    <div className="flex justify-between"><span>Mathematics</span><span className="text-green-600">B (Avg)</span></div>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="font-medium">Areas for Improvement</p>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between"><span>Kiswahili</span><span className="text-red-600">C (Avg)</span></div>
                    <div className="flex justify-between"><span>CRE</span><span className="text-red-600">C- (Avg)</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial">
          <Card>
            <CardHeader><CardTitle>Financial Reports</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <p className="font-medium">Fee Collection by Class</p>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between text-sm"><span>Grade 4 East</span><span className="font-medium">85%</span></div>
                    <div className="flex justify-between text-sm"><span>Form 2 Science</span><span className="font-medium">72%</span></div>
                    <div className="flex justify-between text-sm"><span>Grade 6 CBC</span><span className="font-medium">91%</span></div>
                    <div className="flex justify-between text-sm"><span>Form 4 Combined</span><span className="font-medium">65%</span></div>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="font-medium">Payment Methods</p>
                  <div className="mt-3 space-y-2 text-sm">
                    <div className="flex justify-between"><span>M-Pesa</span><span className="font-medium">68%</span></div>
                    <div className="flex justify-between"><span>Bank Transfer</span><span className="font-medium">18%</span></div>
                    <div className="flex justify-between"><span>Cash</span><span className="font-medium">10%</span></div>
                    <div className="flex justify-between"><span>Cheque</span><span className="font-medium">4%</span></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

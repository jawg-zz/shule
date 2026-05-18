"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye } from "lucide-react";

const feeStructures = [
  { name: "Grade 4 - Term 1 2026", class: "Grade 4 East", total: 35000, components: ["Tuition: 20,000", "Boarding: 10,000", "Transport: 3,000", "Exam: 2,000"], status: "Active" },
  { name: "Form 2 - Term 1 2026", class: "Form 2 Science", total: 45000, components: ["Tuition: 25,000", "Boarding: 12,000", "Activity: 4,000", "Exam: 2,000", "Uniform: 2,000"], status: "Active" },
  { name: "Grade 6 - Term 1 2026", class: "Grade 6 CBC", total: 38000, components: ["Tuition: 22,000", "Boarding: 11,000", "KPSEA Prep: 3,000", "Transport: 2,000"], status: "Active" },
];

export default function FeesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Fee Structures</h1>
          <p className="text-muted-foreground">Manage fee structures per class and term</p>
        </div>
        <Button className="bg-green-700 hover:bg-green-800">
          <Plus className="mr-2 h-4 w-4" /> New Fee Structure
        </Button>
      </div>

      <Card>
        <CardHeader><CardTitle>Fee Structures</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Total (KES)</TableHead>
                <TableHead>Components</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feeStructures.map((fs) => (
                <TableRow key={fs.name}>
                  <TableCell className="font-medium">{fs.name}</TableCell>
                  <TableCell>{fs.class}</TableCell>
                  <TableCell className="font-bold">{fs.total.toLocaleString()}</TableCell>
                  <TableCell>
                    <ul className="text-xs text-muted-foreground">
                      {fs.components.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                  </TableCell>
                  <TableCell><Badge variant="success">{fs.status}</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

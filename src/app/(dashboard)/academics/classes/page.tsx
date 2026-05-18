"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const classList = [
  { name: "Pre-Primary 1", stream: "East", students: 28, teacher: "Jane Wanjiku", curriculum: "CBC" },
  { name: "Pre-Primary 2", stream: "West", students: 32, teacher: "Peter Ochieng", curriculum: "CBC" },
  { name: "Grade 1", stream: "East", students: 35, teacher: "Mary Akinyi", curriculum: "CBC" },
  { name: "Grade 2", stream: "West", students: 30, teacher: "Samuel Kiprop", curriculum: "CBC" },
  { name: "Grade 3", stream: "East", students: 33, teacher: "Faith Chebet", curriculum: "CBC" },
  { name: "Grade 4", stream: "East", students: 38, teacher: "James Mwangi", curriculum: "CBC" },
  { name: "Grade 5", stream: "West", students: 36, teacher: "Grace Wambui", curriculum: "CBC" },
  { name: "Grade 6", stream: "Combined", students: 40, teacher: "David Otieno", curriculum: "CBC" },
  { name: "Form 1", stream: "Science", students: 42, teacher: "Sarah Njeri", curriculum: "8-4-4" },
  { name: "Form 2", stream: "Science", students: 38, teacher: "John Kamau", curriculum: "8-4-4" },
  { name: "Form 3", stream: "Combined", students: 40, teacher: "Emily Wanjala", curriculum: "8-4-4" },
  { name: "Form 4", stream: "Combined", students: 35, teacher: "Patrick Kibet", curriculum: "8-4-4" },
];

export default function ClassesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Classes</h1>
          <p className="text-muted-foreground">Manage classes, streams, and class teachers</p>
        </div>
        <Button className="bg-green-700 hover:bg-green-800">
          <Plus className="mr-2 h-4 w-4" /> Add Class
        </Button>
      </div>

      <Card>
        <CardHeader><CardTitle>All Classes (2026)</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class</TableHead>
                <TableHead>Stream</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Class Teacher</TableHead>
                <TableHead>Curriculum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classList.map((cls) => (
                <TableRow key={`${cls.name}-${cls.stream}`}>
                  <TableCell className="font-medium">{cls.name}</TableCell>
                  <TableCell>{cls.stream}</TableCell>
                  <TableCell>{cls.students}</TableCell>
                  <TableCell>{cls.teacher}</TableCell>
                  <TableCell>
                    <Badge variant={cls.curriculum === "CBC" ? "success" : "default"}>
                      {cls.curriculum}
                    </Badge>
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

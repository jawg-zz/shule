"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const periods = ["7:00-7:40", "7:40-8:20", "8:20-9:00", "9:00-9:40", "10:00-10:40", "10:40-11:20", "11:20-12:00", "12:40-1:20", "1:20-2:00"];

const timetable: Record<string, { subject: string; teacher: string }> = {
  "Monday-0": { subject: "English", teacher: "F. Chebet" },
  "Monday-1": { subject: "Mathematics", teacher: "S. Kiprop" },
  "Monday-2": { subject: "Kiswahili", teacher: "G. Wambui" },
  "Monday-3": { subject: "Science", teacher: "M. Akinyi" },
  "Tuesday-0": { subject: "Mathematics", teacher: "S. Kiprop" },
  "Tuesday-1": { subject: "Social Studies", teacher: "D. Otieno" },
  "Tuesday-2": { subject: "CRE", teacher: "P. Ochieng" },
  "Wednesday-0": { subject: "English", teacher: "F. Chebet" },
  "Wednesday-1": { subject: "Science", teacher: "M. Akinyi" },
  "Wednesday-2": { subject: "PHE", teacher: "J. Mwangi" },
  "Thursday-0": { subject: "Mathematics", teacher: "S. Kiprop" },
  "Thursday-1": { subject: "Kiswahili", teacher: "G. Wambui" },
  "Thursday-2": { subject: "Agriculture", teacher: "P. Ochieng" },
  "Friday-0": { subject: "English", teacher: "F. Chebet" },
  "Friday-1": { subject: "Art & Craft", teacher: "M. Akinyi" },
  "Friday-2": { subject: "Music", teacher: "G. Wambui" },
};

export default function TimetablePage() {
  const [selectedClass, setSelectedClass] = useState("Grade 4 East");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Timetable</h1>
          <p className="text-muted-foreground">View and manage class schedules</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Grade 4 East">Grade 4 East</SelectItem>
              <SelectItem value="Form 2 Science">Form 2 Science</SelectItem>
              <SelectItem value="Grade 6 CBC">Grade 6 CBC</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-green-700 hover:bg-green-800">
            <Plus className="mr-2 h-4 w-4" /> Edit Timetable
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>{selectedClass} — Term 1 2026</CardTitle></CardHeader>
        <CardContent className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Time</TableHead>
                {days.map((day) => (
                  <TableHead key={day} className="text-center">{day}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {periods.map((period, pIdx) => (
                <TableRow key={period}>
                  <TableCell className="font-medium text-xs">{period}</TableCell>
                  {days.map((day) => {
                    const slot = timetable[`${day}-${pIdx}`];
                    return (
                      <TableCell key={day} className="text-center p-1">
                        {slot ? (
                          <div className="rounded-md bg-green-50 p-1">
                            <p className="text-xs font-medium">{slot.subject}</p>
                            <p className="text-[10px] text-muted-foreground">{slot.teacher}</p>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

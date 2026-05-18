"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertCircle, Clock, Save } from "lucide-react";

const studentAttendance = [
  { id: 1, name: "James Mwangi", admission: "260001", status: "PRESENT" },
  { id: 2, name: "Grace Akinyi", admission: "260002", status: "PRESENT" },
  { id: 3, name: "Peter Kamau", admission: "260003", status: "ABSENT" },
  { id: 4, name: "Faith Chebet", admission: "260004", status: "LATE" },
  { id: 5, name: "David Otieno", admission: "260005", status: "PRESENT" },
  { id: 6, name: "Sarah Wambui", admission: "260006", status: "EXCUSED" },
  { id: 7, name: "Kevin Kiprop", admission: "260007", status: "PRESENT" },
  { id: 8, name: "Esther Akoth", admission: "260008", status: "PRESENT" },
];

const statusIcon: Record<string, React.ReactNode> = {
  PRESENT: <CheckCircle2 className="h-4 w-4 text-green-600" />,
  ABSENT: <XCircle className="h-4 w-4 text-red-600" />,
  LATE: <Clock className="h-4 w-4 text-yellow-600" />,
  EXCUSED: <AlertCircle className="h-4 w-4 text-blue-600" />,
};

export default function AttendancePage() {
  const [records, setRecords] = useState(studentAttendance);

  function toggleStatus(id: number) {
    setRecords((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const next: Record<string, string> = { PRESENT: "ABSENT", ABSENT: "LATE", LATE: "EXCUSED", EXCUSED: "PRESENT" };
        return { ...r, status: next[r.status] };
      })
    );
  }

  const stats = {
    present: records.filter((r) => r.status === "PRESENT").length,
    absent: records.filter((r) => r.status === "ABSENT").length,
    late: records.filter((r) => r.status === "LATE").length,
    excused: records.filter((r) => r.status === "EXCUSED").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Attendance</h1>
          <p className="text-muted-foreground">Mark and manage student attendance</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="Grade 4 East">
            <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Grade 4 East">Grade 4 East</SelectItem>
              <SelectItem value="Form 2 Science">Form 2 Science</SelectItem>
            </SelectContent>
          </Select>
          <Input type="date" className="w-[160px]" defaultValue="2026-05-17" />
          <Button className="bg-green-700 hover:bg-green-800">
            <Save className="mr-2 h-4 w-4" /> Save Attendance
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-4">
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-green-600">{stats.present}</div><p className="text-xs text-muted-foreground">Present</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-red-600">{stats.absent}</div><p className="text-xs text-muted-foreground">Absent</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-yellow-600">{stats.late}</div><p className="text-xs text-muted-foreground">Late</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-blue-600">{stats.excused}</div><p className="text-xs text-muted-foreground">Excused</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Student Attendance</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow><TableHead>Admission No.</TableHead><TableHead>Name</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Action</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {records.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-mono text-xs">{r.admission}</TableCell>
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {statusIcon[r.status]}
                      <Badge variant={r.status === "PRESENT" ? "success" : r.status === "ABSENT" ? "destructive" : r.status === "LATE" ? "warning" : "secondary"}>
                        {r.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => toggleStatus(r.id)}>Toggle</Button>
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

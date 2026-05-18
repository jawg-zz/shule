"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

const staffList = [
  { id: 1, staffNo: "STF/2026/0001", name: "Dr. Jane Wanjiku", tsc: "TSC-452781", role: "PRINCIPAL", dept: "Administration", phone: "0721 123 456", status: "Active" },
  { id: 2, staffNo: "STF/2026/0002", name: "Peter Ochieng", tsc: "TSC-452782", role: "DEPUTY_PRINCIPAL", dept: "Administration", phone: "0722 234 567", status: "Active" },
  { id: 3, staffNo: "STF/2026/0003", name: "Mary Akinyi", tsc: "TSC-452783", role: "HEAD_OF_DEPARTMENT", dept: "Science", phone: "0723 345 678", status: "Active" },
  { id: 4, staffNo: "STF/2026/0004", name: "Samuel Kiprop", tsc: "TSC-452784", role: "SENIOR_TEACHER", dept: "Mathematics", phone: "0724 456 789", status: "Active" },
  { id: 5, staffNo: "STF/2026/0005", name: "Faith Chebet", tsc: "TSC-452785", role: "TEACHER", dept: "English", phone: "0725 567 890", status: "Active" },
  { id: 6, staffNo: "STF/2026/0006", name: "James Mwangi", tsc: "", role: "ACCOUNTANT", dept: "Finance", phone: "0726 678 901", status: "Active" },
];

export default function StaffPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Staff</h1>
          <p className="text-muted-foreground">Manage teachers and staff records</p>
        </div>
        <Button className="bg-green-700 hover:bg-green-800">
          <Plus className="mr-2 h-4 w-4" /> Add Staff
        </Button>
      </div>

      <Card>
        <CardHeader><CardTitle>All Staff ({staffList.length})</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>TSC No.</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staffList.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-mono text-xs">{s.staffNo}</TableCell>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell className="font-mono text-xs">{s.tsc || "—"}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{s.role.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}</Badge>
                  </TableCell>
                  <TableCell>{s.dept}</TableCell>
                  <TableCell>{s.phone}</TableCell>
                  <TableCell><Badge variant="success">{s.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

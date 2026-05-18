"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Eye, Edit, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const students = [
  { id: "1", admissionNo: "260001", firstName: "James", lastName: "Mwangi", gender: "Male", class: "Grade 4 East", upi: "UPI-8A3F2B", status: "Active" },
  { id: "2", admissionNo: "260002", firstName: "Grace", lastName: "Akinyi", gender: "Female", class: "Form 2 Science", upi: "UPI-7C1D9E", status: "Active" },
  { id: "3", admissionNo: "260003", firstName: "Peter", lastName: "Kamau", gender: "Male", class: "Grade 6 CBC", upi: "UPI-5E8F4A", status: "Active" },
  { id: "4", admissionNo: "260004", firstName: "Faith", lastName: "Chebet", gender: "Female", class: "Form 4 Combined", upi: "UPI-2B7C3D", status: "Active" },
  { id: "5", admissionNo: "260005", firstName: "David", lastName: "Otieno", gender: "Male", class: "Grade 5 West", upi: "UPI-9F6E1C", status: "Inactive" },
];

export default function StudentsPage() {
  const [search, setSearch] = useState("");

  const filtered = students.filter((s) =>
    `${s.firstName} ${s.lastName} ${s.admissionNo} ${s.upi}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">Manage student records</p>
        </div>
        <Link href="/dashboard/students/new">
          <Button className="bg-green-700 hover:bg-green-800">
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Students</CardTitle>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, admission no, or UPI..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Admission No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>UPI</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.admissionNo}</TableCell>
                  <TableCell>{student.firstName} {student.lastName}</TableCell>
                  <TableCell>{student.gender}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell className="font-mono text-xs">{student.upi}</TableCell>
                  <TableCell>
                    <Badge variant={student.status === "Active" ? "success" : "secondary"}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" /> View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

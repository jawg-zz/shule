"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, Mail, Phone, BookOpen } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function StaffProfilePage() {
  const params = useParams();
  const staff = {
    name: "Dr. Jane Wanjiku",
    staffNo: "STF/2026/0001",
    tsc: "TSC-452781",
    role: "Principal",
    dept: "Administration",
    phone: "0721 123 456",
    email: "jane.wanjiku@shule.ac.ke",
    qualifications: "PhD in Education, MEd (Kenyatta University)",
    subjects: ["Leadership", "Curriculum Development"],
    classes: ["School-wide"],
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/staff">
          <Button variant="ghost" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Staff Profile</h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-green-700 text-white text-lg">JW</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">{staff.name}</h2>
                <p className="text-sm text-muted-foreground">{staff.role} — {staff.dept}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="success">Active</Badge>
                  <span className="text-xs text-muted-foreground">TSC: {staff.tsc}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Mail className="mr-2 h-4 w-4" /> Email</Button>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-lg">Personal Details</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Staff No.</span><span className="font-mono text-xs">{staff.staffNo}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">TSC Number</span><span className="font-mono text-xs">{staff.tsc}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Phone</span><span>{staff.phone}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Email</span><span>{staff.email}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Qualifications</span><span className="text-right max-w-[200px]">{staff.qualifications}</span></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Subjects & Classes</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Subjects</p>
              {staff.subjects.map((s) => <Badge key={s} variant="secondary" className="mr-1 mb-1">{s}</Badge>)}
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Classes</p>
              {staff.classes.map((c) => <Badge key={c} variant="outline" className="mr-1 mb-1">{c}</Badge>)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

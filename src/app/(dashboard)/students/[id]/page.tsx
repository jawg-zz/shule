"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronLeft, Mail, Phone, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function StudentProfilePage() {
  const params = useParams();
  const student = {
    id: params.id,
    admissionNo: "260001",
    firstName: "James",
    lastName: "Mwangi",
    otherNames: "Kamau",
    gender: "Male",
    dateOfBirth: "2014-03-15",
    class: "Grade 4 East",
    upi: "UPI-8A3F2B",
    nemis: "NMS-2026-0001",
    status: "Active",
    religion: "Christian",
    parent: "John Mwangi",
    parentPhone: "0712 345 678",
    parentEmail: "john.mwangi@email.com",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/students">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Student Profile</h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-green-700 text-white text-lg">JM</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">{student.firstName} {student.lastName}</h2>
                <p className="text-sm text-muted-foreground">Admission No: {student.admissionNo}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="success">{student.status}</Badge>
                  <span className="text-xs text-muted-foreground">UPI: {student.upi}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Edit Profile</Button>
              <Button variant="outline" size="sm">Print Report</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="academics">Academics</TabsTrigger>
          <TabsTrigger value="fees">Fees</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="text-lg">Personal Details</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Full Name</span><span>{student.firstName} {student.otherNames} {student.lastName}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Gender</span><span>{student.gender}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Date of Birth</span><span>{student.dateOfBirth}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Religion</span><span>{student.religion}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Nationality</span><span>Kenyan</span></div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">Parent / Guardian</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm"><User className="h-4 w-4 text-muted-foreground" /><span>{student.parent}</span></div>
                <div className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-muted-foreground" /><span>{student.parentPhone}</span></div>
                <div className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4 text-muted-foreground" /><span>{student.parentEmail}</span></div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="academics">
          <Card>
            <CardHeader><CardTitle className="text-lg">Recent Exam Results</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow><TableHead>Subject</TableHead><TableHead>Score</TableHead><TableHead>Grade</TableHead><TableHead>Remarks</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell>English</TableCell><TableCell>72</TableCell><TableCell><Badge>B+</Badge></TableCell><TableCell>Good</TableCell></TableRow>
                  <TableRow><TableCell>Mathematics</TableCell><TableCell>68</TableCell><TableCell><Badge>B</Badge></TableCell><TableCell>Satisfactory</TableCell></TableRow>
                  <TableRow><TableCell>Kiswahili</TableCell><TableCell>65</TableCell><TableCell><Badge>B-</Badge></TableCell><TableCell>Average</TableCell></TableRow>
                  <TableRow><TableCell>Science</TableCell><TableCell>78</TableCell><TableCell><Badge variant="success">A-</Badge></TableCell><TableCell>Excellent</TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fees">
          <Card>
            <CardHeader><CardTitle className="text-lg">Fee Statement</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm"><span>Term 1 Fees</span><span className="font-medium">KES 35,000</span></div>
                <div className="flex justify-between text-sm"><span>Amount Paid</span><span className="font-medium text-green-600">KES 30,000</span></div>
                <div className="flex justify-between text-sm font-bold border-t pt-2"><span>Balance</span><span className="text-red-600">KES 5,000</span></div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance">
          <Card>
            <CardHeader><CardTitle className="text-lg">Attendance Record</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Attendance rate: 95% (Present: 42/44 days)</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

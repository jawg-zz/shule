"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

export default function NewStudentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulated API call
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    router.push("/dashboard/students");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/students">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admit New Student</h1>
          <p className="text-muted-foreground">Enter student details to enroll</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Basic details about the student</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input id="firstName" placeholder="e.g. James" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input id="lastName" placeholder="e.g. Mwangi" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="otherNames">Other Names</Label>
                <Input id="otherNames" placeholder="e.g. Kamau" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth *</Label>
                <Input id="dob" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Input id="nationality" defaultValue="Kenyan" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="upi">UPI Number</Label>
                <Input id="upi" placeholder="e.g. UPI-8A3F2B" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nemis">NEMIS Number</Label>
                <Input id="nemis" placeholder="e.g. NMS-2026-0001" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="religion">Religion</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select religion" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CHRISTIAN">Christian</SelectItem>
                    <SelectItem value="MUSLIM">Muslim</SelectItem>
                    <SelectItem value="HINDU">Hindu</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthCert">Birth Certificate No.</Label>
                <Input id="birthCert" placeholder="e.g. B/C 123456" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Enrollment Details</CardTitle>
            <CardDescription>Class and academic information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="class">Class *</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PP1">Pre-Primary 1</SelectItem>
                    <SelectItem value="PP2">Pre-Primary 2</SelectItem>
                    <SelectItem value="GRADE_1">Grade 1</SelectItem>
                    <SelectItem value="GRADE_2">Grade 2</SelectItem>
                    <SelectItem value="GRADE_3">Grade 3</SelectItem>
                    <SelectItem value="GRADE_4">Grade 4</SelectItem>
                    <SelectItem value="GRADE_5">Grade 5</SelectItem>
                    <SelectItem value="GRADE_6">Grade 6</SelectItem>
                    <SelectItem value="GRADE_7">Grade 7</SelectItem>
                    <SelectItem value="FORM_1">Form 1</SelectItem>
                    <SelectItem value="FORM_2">Form 2</SelectItem>
                    <SelectItem value="FORM_3">Form 3</SelectItem>
                    <SelectItem value="FORM_4">Form 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stream">Stream</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select stream" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="East">East</SelectItem>
                    <SelectItem value="West">West</SelectItem>
                    <SelectItem value="North">North</SelectItem>
                    <SelectItem value="South">South</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="prevSchool">Previous School</Label>
                <Input id="prevSchool" placeholder="Previous school name" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Parent / Guardian Information</CardTitle>
            <CardDescription>Contact details of parent or guardian</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="parentName">Parent Name *</Label>
                <Input id="parentName" placeholder="e.g. John Mwangi" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parentPhone">Phone Number *</Label>
                <Input id="parentPhone" placeholder="e.g. 0712 345 678" required />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="parentEmail">Email</Label>
                <Input id="parentEmail" type="email" placeholder="parent@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parentId">ID Number</Label>
                <Input id="parentId" placeholder="e.g. 12345678" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-end gap-3">
          <Link href="/dashboard/students">
            <Button variant="outline" type="button">Cancel</Button>
          </Link>
          <Button type="submit" className="bg-green-700 hover:bg-green-800" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {loading ? "Saving..." : "Admit Student"}
          </Button>
        </div>
      </form>
    </div>
  );
}

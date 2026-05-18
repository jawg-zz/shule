"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const cbcSubjects = [
  { code: "ENG", name: "English", level: "Grade 1-6", group: "Core" },
  { code: "KIS", name: "Kiswahili", level: "Grade 1-6", group: "Core" },
  { code: "MATH", name: "Mathematics", level: "Grade 1-6", group: "Core" },
  { code: "SCI", name: "Science & Technology", level: "Grade 4-6", group: "Core" },
  { code: "SST", name: "Social Studies", level: "Grade 4-6", group: "Core" },
  { code: "CRE", name: "Christian Religious Education", level: "Grade 4-6", group: "Core" },
  { code: "AGR", name: "Agriculture", level: "Grade 4-6", group: "Core" },
  { code: "HSC", name: "Home Science", level: "Grade 4-6", group: "Core" },
  { code: "PHE", name: "Physical & Health Education", level: "Grade 4-6", group: "Core" },
  { code: "ART", name: "Art & Craft", level: "Grade 4-6", group: "Core" },
  { code: "MUS", name: "Music", level: "Grade 4-6", group: "Core" },
];

const kcseSubjects = [
  { code: "101", name: "English", group: "Group 1 (Compulsory)" },
  { code: "102", name: "Kiswahili", group: "Group 1 (Compulsory)" },
  { code: "121", name: "Mathematics A", group: "Group 1 (Compulsory)" },
  { code: "231", name: "Biology", group: "Group 2 (Sciences)" },
  { code: "232", name: "Physics", group: "Group 2 (Sciences)" },
  { code: "233", name: "Chemistry", group: "Group 2 (Sciences)" },
  { code: "311", name: "History & Government", group: "Group 3 (Humanities)" },
  { code: "312", name: "Geography", group: "Group 3 (Humanities)" },
  { code: "313", name: "CRE", group: "Group 3 (Humanities)" },
  { code: "443", name: "Agriculture", group: "Group 4 (Technicals)" },
  { code: "444", name: "Computer Studies", group: "Group 4 (Technicals)" },
  { code: "565", name: "Business Studies", group: "Group 5 (Languages/Business)" },
];

export default function SubjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Subjects</h1>
        <p className="text-muted-foreground">Manage CBC learning areas and 8-4-4 subjects</p>
      </div>

      <Tabs defaultValue="cbc">
        <TabsList>
          <TabsTrigger value="cbc">CBC Learning Areas</TabsTrigger>
          <TabsTrigger value="kcse">8-4-4 Subjects</TabsTrigger>
        </TabsList>

        <TabsContent value="cbc">
          <Card>
            <CardHeader><CardTitle>CBC Learning Areas</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow><TableHead>Code</TableHead><TableHead>Learning Area</TableHead><TableHead>Level</TableHead><TableHead>Type</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                  {cbcSubjects.map((sub) => (
                    <TableRow key={sub.code}>
                      <TableCell className="font-mono text-xs">{sub.code}</TableCell>
                      <TableCell className="font-medium">{sub.name}</TableCell>
                      <TableCell>{sub.level}</TableCell>
                      <TableCell><Badge variant="secondary">{sub.group}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kcse">
          <Card>
            <CardHeader><CardTitle>KCSE Subjects (8-4-4)</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow><TableHead>Code</TableHead><TableHead>Subject</TableHead><TableHead>Group</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                  {kcseSubjects.map((sub) => (
                    <TableRow key={sub.code}>
                      <TableCell className="font-mono text-xs">{sub.code}</TableCell>
                      <TableCell className="font-medium">{sub.name}</TableCell>
                      <TableCell><Badge variant="secondary">{sub.group}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

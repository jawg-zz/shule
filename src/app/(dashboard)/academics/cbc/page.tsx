"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";

const cbcLevels = [
  { level: "PP1-PP2", competencies: 7, learningAreas: 5, description: "Pre-Primary: Language, Math, Environmental, Psychomotor, RE" },
  { level: "Grade 1-3", competencies: 7, learningAreas: 7, description: "Lower Primary: Core + Literacy, Numeracy, Hygiene" },
  { level: "Grade 4-6", competencies: 7, learningAreas: 11, description: "Upper Primary: Full range incl. Science, Social Studies, Creative Arts" },
  { level: "Grade 7-9", competencies: 7, learningAreas: 12, description: "Junior Secondary: Core + Options (STEM, Arts, Languages)" },
  { level: "Grade 10-12", competencies: 7, learningAreas: 0, description: "Senior School: 3 pathways — STEM, Social Sciences, Arts & Sports" },
];

const competencies = [
  "Communication and Collaboration",
  "Critical Thinking and Problem Solving",
  "Creativity and Imagination",
  "Citizenship",
  "Learning to Learn",
  "Self-efficacy",
  "Digital Literacy",
];

const performanceLevels = [
  { level: "Exceeds Expectation", code: "EE", color: "bg-green-100 text-green-800" },
  { level: "Meets Expectation", code: "ME", color: "bg-blue-100 text-blue-700" },
  { level: "Approaches Expectation", code: "AE", color: "bg-yellow-100 text-yellow-800" },
  { level: "Below Expectation", code: "BE", color: "bg-red-100 text-red-800" },
];

export default function CBCPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">CBC Assessments</h1>
          <p className="text-muted-foreground">Competency-Based Curriculum — strands, sub-strands, and performance tracking</p>
        </div>
        <Button className="bg-green-700 hover:bg-green-800">
          <Plus className="mr-2 h-4 w-4" /> New Assessment
        </Button>
      </div>

      <Card>
        <CardHeader><CardTitle>CBC Levels Overview</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow><TableHead>Level</TableHead><TableHead>Competencies</TableHead><TableHead>Learning Areas</TableHead><TableHead>Description</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {cbcLevels.map((item) => (
                <TableRow key={item.level}>
                  <TableCell className="font-medium">{item.level}</TableCell>
                  <TableCell>{item.competencies}</TableCell>
                  <TableCell>{item.learningAreas}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{item.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>7 Core Competencies</CardTitle></CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {competencies.map((c, i) => (
              <div key={i} className="rounded-lg border p-3 text-sm">
                <span className="font-medium">{i + 1}. {c}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Performance Levels</CardTitle></CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-4">
            {performanceLevels.map((pl) => (
              <div key={pl.code} className={`rounded-lg border p-4 text-center ${pl.color}`}>
                <div className="text-2xl font-bold">{pl.code}</div>
                <div className="text-sm mt-1">{pl.level}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            CBC uses performance levels instead of percentages. Assessment is 40% school-based + 60% national exam (KPSEA/KJSEA/KCBE).
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

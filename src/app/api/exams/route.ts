import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { getDefaultSchoolId, getDefaultStaffId } from "@/lib/defaults";

type ExamScoreInput = {
  studentId: string;
  subjectId: string;
  score: number | null;
};

function scoreToGrade(score: number): { grade: string; points: number } {
  if (score >= 80) return { grade: "A", points: 12 };
  if (score >= 75) return { grade: "A-", points: 11 };
  if (score >= 70) return { grade: "B+", points: 10 };
  if (score >= 65) return { grade: "B", points: 9 };
  if (score >= 60) return { grade: "B-", points: 8 };
  if (score >= 55) return { grade: "C+", points: 7 };
  if (score >= 50) return { grade: "C", points: 6 };
  if (score >= 45) return { grade: "C-", points: 5 };
  if (score >= 40) return { grade: "D+", points: 4 };
  if (score >= 35) return { grade: "D", points: 3 };
  if (score >= 30) return { grade: "D-", points: 2 };
  return { grade: "E", points: 1 };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const examId = searchParams.get("examId");
  const classId = searchParams.get("classId");

  if (examId) {
    const exam = await prisma.exam.findUnique({
      where: { id: examId },
      include: {
        results: {
          include: { student: true, subject: true },
        },
        class: true,
        term: true,
      },
    });
    return NextResponse.json(exam);
  }

  const where: Prisma.ExamWhereInput = {};
  if (classId) where.classId = classId;

  const exams = await prisma.exam.findMany({
    where,
    include: {
      class: true,
      term: true,
      _count: { select: { results: true } },
    },
    orderBy: { startDate: "desc" },
  });

  return NextResponse.json(exams);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, type, classId, termId, startDate, endDate, scores } = body as {
      name: string;
      type: string;
      classId: string;
      termId: string;
      startDate: string;
      endDate: string;
      scores?: ExamScoreInput[];
    };
    const schoolId = await getDefaultSchoolId();
    const createdById = await getDefaultStaffId(schoolId);

    const exam = await prisma.exam.create({
      data: {
        name,
        type,
        classId,
        termId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        createdById,
        results: scores ? {
          create: scores.map((s) => {
            const { grade, points } = s.score != null
              ? scoreToGrade(s.score)
              : { grade: null, points: null };

            return {
              studentId: s.studentId,
              subjectId: s.subjectId,
              score: s.score,
              grade,
              points,
            };
          }),
        } : undefined,
      },
    });

    return NextResponse.json(exam, { status: 201 });
  } catch (error) {
    console.error("[exams] Failed to create exam:", error);
    return NextResponse.json({ error: "Failed to create exam" }, { status: 500 });
  }
}

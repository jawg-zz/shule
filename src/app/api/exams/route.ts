import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { computeKCSE } from "@/lib/kcse/grades";

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

  const where: any = {};
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
    const { name, type, classId, termId, startDate, endDate, scores } = body;

    const exam = await prisma.exam.create({
      data: {
        name,
        type,
        classId,
        termId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        createdById: "default-staff-id",
        results: scores ? {
          create: scores.map((s: any) => {
            const { grade, points } = s.score != null
              ? ((g) => g)((() => {
                  const score = s.score;
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
                })())
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
    return NextResponse.json({ error: "Failed to create exam" }, { status: 500 });
  }
}

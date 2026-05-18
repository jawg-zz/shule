import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const classes = await prisma.class.findMany({
    include: {
      _count: { select: { enrollments: { where: { isCurrent: true } } } },
      classTeacher: true,
    },
    orderBy: { level: "asc" },
  });

  return NextResponse.json(classes);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, level, stream, curriculum, classTeacherId } = body;

    const cls = await prisma.class.create({
      data: {
        name,
        level,
        stream,
        curriculum,
        schoolId: "default-school-id",
        academicYearId: "default-academic-year-id",
        classTeacherId,
      },
    });

    return NextResponse.json(cls, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create class" }, { status: 500 });
  }
}

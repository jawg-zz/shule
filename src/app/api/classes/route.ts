import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAcademicYearId, getDefaultSchoolId } from "@/lib/defaults";

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
    const schoolId = await getDefaultSchoolId();
    const academicYearId = await getCurrentAcademicYearId(schoolId);

    const cls = await prisma.class.create({
      data: {
        name,
        level,
        stream,
        curriculum,
        schoolId,
        academicYearId,
        classTeacherId,
      },
    });

    return NextResponse.json(cls, { status: 201 });
  } catch (error) {
    console.error("[classes] Failed to create class:", error);
    return NextResponse.json({ error: "Failed to create class" }, { status: 500 });
  }
}

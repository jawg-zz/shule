import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const classId = searchParams.get("classId");
  const date = searchParams.get("date") || new Date().toISOString().split("T")[0];

  if (classId) {
    const students = await prisma.student.findMany({
      where: {
        isActive: true,
        enrollments: { some: { classId, isCurrent: true } },
      },
      include: {
        attendance: {
          where: { date: new Date(date) },
          take: 1,
        },
      },
      orderBy: { firstName: "asc" },
    });

    return NextResponse.json(students);
  }

  const where: any = {};
  if (date) where.date = new Date(date);

  const records = await prisma.studentAttendance.findMany({
    where,
    include: { student: true, recordedBy: true },
    orderBy: { date: "desc" },
  });

  return NextResponse.json(records);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { records } = body;

    const created = await prisma.$transaction(
      records.map((r: any) =>
        prisma.studentAttendance.upsert({
          where: {
            studentId_date: { studentId: r.studentId, date: new Date(r.date) },
          },
          update: { status: r.status, remarks: r.remarks },
          create: {
            studentId: r.studentId,
            date: new Date(r.date),
            status: r.status,
            remarks: r.remarks,
            recordedById: r.recordedById || "default-staff-id",
          },
        })
      )
    );

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save attendance" }, { status: 500 });
  }
}

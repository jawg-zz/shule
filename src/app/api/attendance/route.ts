import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { AttendanceStatus, Prisma } from "@prisma/client";
import { getDefaultSchoolId, getDefaultStaffId } from "@/lib/defaults";

type AttendanceRecordInput = {
  studentId: string;
  date: string;
  status: AttendanceStatus;
  remarks?: string | null;
  recordedById?: string;
};

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

  const where: Prisma.StudentAttendanceWhereInput = {};
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
    const { records } = body as { records: AttendanceRecordInput[] };
    const schoolId = await getDefaultSchoolId();
    const fallbackStaffId = await getDefaultStaffId(schoolId);

    const created = await prisma.$transaction(
      records.map((r) =>
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
            recordedById: r.recordedById || fallbackStaffId,
          },
        })
      )
    );

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("[attendance] Failed to save attendance:", error);
    return NextResponse.json({ error: "Failed to save attendance" }, { status: 500 });
  }
}

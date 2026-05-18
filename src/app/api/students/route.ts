import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { getDefaultSchoolId } from "@/lib/defaults";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const classId = searchParams.get("classId");
  const search = searchParams.get("search");

  const where: Prisma.StudentWhereInput = { isActive: true };
  if (classId) {
    where.enrollments = { some: { classId, isCurrent: true } };
  }
  if (search) {
    where.OR = [
      { firstName: { contains: search, mode: "insensitive" } },
      { lastName: { contains: search, mode: "insensitive" } },
      { admissionNo: { contains: search, mode: "insensitive" } },
    ];
  }

  const students = await prisma.student.findMany({
    where,
    include: {
      enrollments: { where: { isCurrent: true }, include: { class: true } },
      parents: { include: { parent: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(students);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, otherNames, gender, dateOfBirth, upi, nemisNumber, religion, phone, email, address, previousSchool, classId, parentName, parentPhone, parentEmail } = body;
    const schoolId = await getDefaultSchoolId();

    const count = await prisma.student.count();
    const admissionNo = `${new Date().getFullYear().toString().slice(-2)}${String(count + 1).padStart(4, "0")}`;

    const student = await prisma.student.create({
      data: {
        admissionNo,
        upi,
        nemisNumber,
        firstName,
        lastName,
        otherNames,
        gender,
        dateOfBirth: new Date(dateOfBirth),
        religion,
        phone,
        email,
        address,
        previousSchool,
        schoolId,
        enrollments: classId ? {
          create: { classId, isCurrent: true },
        } : undefined,
      },
    });

    if (parentName && parentPhone) {
      const existingParent = await prisma.parent.findFirst({
        where: { phone: parentPhone },
      });

      if (existingParent) {
        await prisma.studentParent.create({
          data: { studentId: student.id, parentId: existingParent.id },
        });
      } else {
        const newParent = await prisma.parent.create({
          data: { firstName: parentName.split(" ")[0], lastName: parentName.split(" ").slice(1).join(" ") || "N/A", phone: parentPhone, email: parentEmail },
        });
        await prisma.studentParent.create({
          data: { studentId: student.id, parentId: newParent.id },
        });
      }
    }

    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    console.error("[students] Failed to create student:", error);
    return NextResponse.json({ error: "Failed to create student" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const staff = await prisma.staff.findMany({
    include: {
      subjectAllocations: {
        include: { subject: true, class: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(staff);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, otherNames, gender, dateOfBirth, phone, email, idNumber, tscNumber, kraPin, qualifications, role, employmentDate } = body;

    const count = await prisma.staff.count();
    const staffNo = `STF/${new Date().getFullYear()}/${String(count + 1).padStart(4, "0")}`;

    const staff = await prisma.staff.create({
      data: {
        staffNo,
        tscNumber,
        kraPin,
        firstName,
        lastName,
        otherNames,
        gender,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        phone,
        email,
        idNumber,
        qualifications,
        role,
        employmentDate: new Date(employmentDate),
        schoolId: "default-school-id",
      },
    });

    return NextResponse.json(staff, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create staff" }, { status: 500 });
  }
}

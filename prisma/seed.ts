import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const passwordHash = await bcrypt.hash("admin123", 10);

  const school = await prisma.school.upsert({
    where: { id: "default-school-id" },
    update: {},
    create: {
      id: "default-school-id",
      name: "Shule High School",
      address: "P.O. Box 1234, Nairobi",
      phone: "+254 712 345 678",
      email: "info@shule.ac.ke",
      motto: "Excellence in Education",
      tscSchoolCode: "TSC-SCH-001",
      nemisCode: "NMS-SCH-001",
    },
  });

  await prisma.user.upsert({
    where: { email: "admin@shule.ac.ke" },
    update: {},
    create: {
      email: "admin@shule.ac.ke",
      passwordHash,
      name: "System Admin",
      role: "SUPER_ADMIN",
    },
  });

  const academicYear = await prisma.academicYear.upsert({
    where: { schoolId_year: { schoolId: school.id, year: 2026 } },
    update: {},
    create: {
      year: 2026,
      name: "2026 Academic Year",
      isCurrent: true,
      schoolId: school.id,
    },
  });

  const terms = [
    { name: "Term 1", termNumber: 1, startDate: new Date("2026-01-05"), endDate: new Date("2026-04-02"), isCurrent: true },
    { name: "Term 2", termNumber: 2, startDate: new Date("2026-04-27"), endDate: new Date("2026-07-31"), isCurrent: false },
    { name: "Term 3", termNumber: 3, startDate: new Date("2026-08-24"), endDate: new Date("2026-10-29"), isCurrent: false },
  ];

  for (const term of terms) {
    await prisma.term.upsert({
      where: { academicYearId_termNumber: { academicYearId: academicYear.id, termNumber: term.termNumber } },
      update: {},
      create: {
        ...term,
        academicYearId: academicYear.id,
      },
    });
  }

  const classLevels = [
    { name: "Pre-Primary 1", level: "PP1" as const, stream: "East", curriculum: "CBC" as const },
    { name: "Pre-Primary 2", level: "PP2" as const, stream: "West", curriculum: "CBC" as const },
    { name: "Grade 1", level: "GRADE_1" as const, stream: "East", curriculum: "CBC" as const },
    { name: "Grade 2", level: "GRADE_2" as const, stream: "West", curriculum: "CBC" as const },
    { name: "Grade 3", level: "GRADE_3" as const, stream: "East", curriculum: "CBC" as const },
    { name: "Grade 4", level: "GRADE_4" as const, stream: "East", curriculum: "CBC" as const },
    { name: "Grade 5", level: "GRADE_5" as const, stream: "West", curriculum: "CBC" as const },
    { name: "Grade 6", level: "GRADE_6" as const, stream: "Combined", curriculum: "CBC" as const },
    { name: "Form 1", level: "FORM_1" as const, stream: "Science", curriculum: "EIGHT_FOUR_FOUR" as const },
    { name: "Form 2", level: "FORM_2" as const, stream: "Science", curriculum: "EIGHT_FOUR_FOUR" as const },
    { name: "Form 3", level: "FORM_3" as const, stream: "Combined", curriculum: "EIGHT_FOUR_FOUR" as const },
    { name: "Form 4", level: "FORM_4" as const, stream: "Combined", curriculum: "EIGHT_FOUR_FOUR" as const },
  ];

  for (const cls of classLevels) {
    await prisma.class.upsert({
      where: { schoolId_level_stream_academicYearId: { schoolId: school.id, level: cls.level, stream: cls.stream, academicYearId: academicYear.id } },
      update: {},
      create: {
        ...cls,
        schoolId: school.id,
        academicYearId: academicYear.id,
      },
    });
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

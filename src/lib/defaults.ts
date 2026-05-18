import { prisma } from "@/lib/prisma";

export async function getDefaultSchoolId() {
  const school = await prisma.school.findFirst({
    orderBy: { createdAt: "asc" },
    select: { id: true },
  });

  if (!school) {
    throw new Error("No school record found. Seed or create a school before using this feature.");
  }

  return school.id;
}

export async function getCurrentAcademicYearId(schoolId: string) {
  const currentYear = await prisma.academicYear.findFirst({
    where: { schoolId, isCurrent: true },
    orderBy: { year: "desc" },
    select: { id: true },
  });

  if (currentYear) return currentYear.id;

  const latestYear = await prisma.academicYear.findFirst({
    where: { schoolId },
    orderBy: { year: "desc" },
    select: { id: true },
  });

  if (!latestYear) {
    throw new Error("No academic year found. Seed or create an academic year before using this feature.");
  }

  return latestYear.id;
}

export async function getDefaultStaffId(schoolId: string) {
  const staff = await prisma.staff.findFirst({
    where: { schoolId, isActive: true },
    orderBy: { createdAt: "asc" },
    select: { id: true },
  });

  if (staff) return staff.id;

  const fallback = await prisma.staff.create({
    data: {
      staffNo: `STF/${new Date().getFullYear()}/0001`,
      firstName: "System",
      lastName: "Staff",
      gender: "OTHER",
      phone: "N/A",
      role: "ADMINISTRATOR",
      schoolId,
    },
    select: { id: true },
  });

  return fallback.id;
}

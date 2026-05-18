import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const totalStudents = await prisma.student.count({ where: { isActive: true } });
    const totalStaff = await prisma.staff.count({ where: { isActive: true } });
    const totalClasses = await prisma.class.count();

    const studentsByGender = await prisma.student.groupBy({
      by: ["gender"],
      _count: true,
      where: { isActive: true },
    });

    const studentsByLevel = await prisma.enrollment.findMany({
      where: { isCurrent: true },
      include: { class: true },
    });

    const levelCounts: Record<string, number> = {};
    studentsByLevel.forEach((e: { class: { level: string | null } }) => {
      const key = `${e.class.level}`;
      levelCounts[key] = (levelCounts[key] || 0) + 1;
    });

    const recentPayments = await prisma.payment.findMany({
      where: { status: "COMPLETED" },
      orderBy: { paymentDate: "desc" },
      take: 10,
      include: { student: true },
    });

    const totalFees = await prisma.payment.aggregate({
      where: { status: "COMPLETED" },
      _sum: { amount: true },
    });

    const totalOutstanding = await prisma.invoice.aggregate({
      where: { status: { in: ["PENDING", "PARTIAL", "OVERDUE"] } },
      _sum: { balance: true },
    });

    return NextResponse.json({
      totalStudents,
      totalStaff,
      totalClasses,
      totalFeesCollected: totalFees._sum.amount || 0,
      totalOutstanding: totalOutstanding._sum.balance || 0,
      studentsByGender,
      enrollmentByLevel: levelCounts,
      recentPayments,
    });
  } catch (error) {
    console.error("[analytics] Error:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Analytics unavailable" }, { status: 500 });
  }
}

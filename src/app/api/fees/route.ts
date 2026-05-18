import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { getDefaultSchoolId } from "@/lib/defaults";

type InvoiceSummary = {
  totalBilled: number;
  totalPaid: number;
  totalBalance: number;
};

type FeeComponentInput = {
  name: string;
  amount: number;
  isOptional?: boolean;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const classId = searchParams.get("classId");
  const studentId = searchParams.get("studentId");

  if (studentId) {
    const invoices = await prisma.invoice.findMany({
      where: { studentId },
      include: { feeStructure: { include: { components: true } }, payments: true },
      orderBy: { issueDate: "desc" },
    });

    const summary = invoices.reduce(
      (acc: InvoiceSummary, inv) => ({
        totalBilled: acc.totalBilled + inv.totalAmount,
        totalPaid: acc.totalPaid + inv.paidAmount,
        totalBalance: acc.totalBalance + inv.balance,
      }),
      { totalBilled: 0, totalPaid: 0, totalBalance: 0 }
    );

    return NextResponse.json({ invoices, summary });
  }

  const where: Prisma.FeeStructureWhereInput = {};
  if (classId) where.classId = classId;

  const feeStructures = await prisma.feeStructure.findMany({
    where,
    include: { components: true, class: true, term: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(feeStructures);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, totalAmount, classId, termId, components } = body as {
      name: string;
      totalAmount: number;
      classId?: string;
      termId?: string;
      components: FeeComponentInput[];
    };
    const schoolId = await getDefaultSchoolId();

    const feeStructure = await prisma.feeStructure.create({
      data: {
        name,
        totalAmount,
        schoolId,
        classId,
        termId,
        components: {
          create: components.map((c) => ({
            name: c.name,
            amount: c.amount,
            isOptional: c.isOptional || false,
          })),
        },
      },
      include: { components: true },
    });

    return NextResponse.json(feeStructure, { status: 201 });
  } catch (error) {
    console.error("[fees] Failed to create fee structure:", error);
    return NextResponse.json({ error: "Failed to create fee structure" }, { status: 500 });
  }
}

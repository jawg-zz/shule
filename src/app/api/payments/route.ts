import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get("studentId");
  const method = searchParams.get("method");

  const where: any = {};
  if (studentId) where.studentId = studentId;
  if (method) where.method = method;

  const payments = await prisma.payment.findMany({
    where,
    include: { student: true, invoice: true },
    orderBy: { paymentDate: "desc" },
  });

  return NextResponse.json(payments);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { invoiceId, studentId, amount, method, mpesaRef, mpesaReceipt, notes } = body;

    const count = await prisma.payment.count();
    const transactionNo = `TXN-${new Date().getFullYear()}-${String(count + 1).padStart(5, "0")}`;

    const payment = await prisma.payment.create({
      data: {
        transactionNo,
        invoiceId,
        studentId,
        amount,
        method,
        mpesaRef,
        mpesaReceipt,
        notes,
        status: "COMPLETED",
      },
    });

    await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        paidAmount: { increment: amount },
        balance: { decrement: amount },
        status: "PARTIAL",
      },
    });

    const invoice = await prisma.invoice.findUnique({ where: { id: invoiceId } });
    if (invoice && invoice.balance <= 0) {
      await prisma.invoice.update({
        where: { id: invoiceId },
        data: { status: "PAID" },
      });
    }

    return NextResponse.json(payment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to record payment" }, { status: 500 });
  }
}

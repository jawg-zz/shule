import { NextRequest, NextResponse } from "next/server";
import { stkPush } from "@/lib/mpesa/daraja";

const mpesaConfig = {
  consumerKey: process.env.MPESA_CONSUMER_KEY || "",
  consumerSecret: process.env.MPESA_CONSUMER_SECRET || "",
  passkey: process.env.MPESA_PASSKEY || "",
  shortcode: process.env.MPESA_SHORTCODE || "174379",
  environment: (process.env.MPESA_ENVIRONMENT as "sandbox" | "production") || "sandbox",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phoneNumber, amount, accountReference, transactionDesc } = body;

    if (!phoneNumber || !amount) {
      return NextResponse.json({ error: "Phone number and amount are required" }, { status: 400 });
    }

    const result = await stkPush(mpesaConfig, {
      phoneNumber,
      amount: Number(amount),
      accountReference: accountReference || "School Fees",
      transactionDesc: transactionDesc || "Fee Payment",
    });

    if (result.ResponseCode === "0") {
      return NextResponse.json({
        success: true,
        checkoutRequestID: result.CheckoutRequestID,
        merchantRequestID: result.MerchantRequestID,
        message: "STK Push sent successfully",
      });
    }

    return NextResponse.json({
      success: false,
      error: result.ResponseDescription || "Failed to send STK Push",
    }, { status: 400 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "M-Pesa request failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

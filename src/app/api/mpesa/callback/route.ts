import { NextRequest, NextResponse } from "next/server";
import type { MpesaCallback } from "@/lib/mpesa/daraja";

export async function POST(request: NextRequest) {
  try {
    const callbackData: MpesaCallback = await request.json();
    const { stkCallback } = callbackData.Body;

    const { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = stkCallback;

    if (ResultCode !== 0) {
      console.error(`M-Pesa payment failed: ${ResultDesc}`);
      return NextResponse.json({ ResultCode: 0, ResultDesc: "Received" });
    }

    const metadata = CallbackMetadata?.Item || [];
    const getValue = (name: string) => metadata.find((item) => item.Name === name)?.Value;

    const amount = Number(getValue("Amount") || 0);
    const mpesaReceipt = String(getValue("MpesaReceiptNumber") || "");
    const phoneNumber = String(getValue("PhoneNumber") || "");
    const transactionDate = String(getValue("TransactionDate") || "");

    console.log(`M-Pesa payment received: ${mpesaReceipt} - KES ${amount} from ${phoneNumber}`);

    return NextResponse.json({ ResultCode: 0, ResultDesc: "Success" });
  } catch (error) {
    console.error("M-Pesa callback error:", error);
    return NextResponse.json({ ResultCode: 1, ResultDesc: "Failed" });
  }
}

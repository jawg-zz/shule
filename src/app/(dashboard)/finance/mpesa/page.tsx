"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Send, Loader2, CheckCircle2, XCircle } from "lucide-react";

export default function MpesaPage() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSTKPush(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    try {
      await new Promise((r) => setTimeout(r, 2000));
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">M-Pesa Integration</h1>
        <p className="text-muted-foreground">Safaricom Daraja API — send STK Push payment requests to parents</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-green-600" />
              Send STK Push
            </CardTitle>
            <CardDescription>
              Send a payment request to a parent&apos;s M-Pesa phone number
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSTKPush} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="student">Student</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select student" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">James Mwangi (260001)</SelectItem>
                    <SelectItem value="2">Grace Akinyi (260002)</SelectItem>
                    <SelectItem value="3">Peter Kamau (260003)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Parent Phone Number</Label>
                <Input id="phone" placeholder="e.g. 0712345678" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                <p className="text-xs text-muted-foreground">Safaricom number for M-Pesa STK Push</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (KES)</Label>
                <Input id="amount" type="number" placeholder="e.g. 5000" value={amount} onChange={(e) => setAmount(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Description</Label>
                <Input id="desc" defaultValue="School Fee Payment" />
              </div>
              <Button type="submit" className="w-full bg-green-700 hover:bg-green-800" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                {loading ? "Sending..." : "Send Payment Request"}
              </Button>
            </form>

            {status === "success" && (
              <div className="mt-4 flex items-center gap-2 rounded-md bg-green-50 p-3 text-sm text-green-800">
                <CheckCircle2 className="h-4 w-4" /> STK Push sent successfully! Parent will receive M-Pesa prompt.
              </div>
            )}
            {status === "error" && (
              <div className="mt-4 flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-800">
                <XCircle className="h-4 w-4" /> Failed to send. Please try again.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>M-Pesa Configuration</CardTitle>
            <CardDescription>Daraja API settings (configure in .env)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Environment</span><Badge variant="secondary">Sandbox</Badge></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Shortcode</span><span className="font-mono">174379</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Consumer Key</span><span className="font-mono">••••••••</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Consumer Secret</span><span className="font-mono">••••••••</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Passkey</span><span className="font-mono">••••••••</span></div>
            </div>

            <div className="rounded-md bg-blue-50 p-3 text-sm text-blue-700 mt-4">
              <p className="font-medium">API Endpoints</p>
              <ul className="mt-1 space-y-1 text-xs">
                <li>STK Push: POST /api/mpesa/stkpush</li>
                <li>Callback: POST /api/mpesa/callback</li>
                <li>Status Query: POST /api/mpesa/status</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

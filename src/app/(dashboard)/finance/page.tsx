"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Receipt, CreditCard, Smartphone } from "lucide-react";

const financeModules = [
  { title: "Fee Structures", description: "Set up fees per class and term", href: "/dashboard/finance/fees", icon: Receipt },
  { title: "Payments", description: "Record and manage fee payments", href: "/dashboard/finance/payments", icon: CreditCard },
  { title: "M-Pesa", description: "M-Pesa Daraja integration and STK Push", href: "/dashboard/finance/mpesa", icon: Smartphone },
];

export default function FinancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Finance</h1>
        <p className="text-muted-foreground">Fee management, payment tracking, and M-Pesa integration</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-700">KES 3.2M</div>
            <p className="text-sm text-muted-foreground">Total Collected (Term 1)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-600">KES 907K</div>
            <p className="text-sm text-muted-foreground">Outstanding Balance</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">78%</div>
            <p className="text-sm text-muted-foreground">Collection Rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {financeModules.map((mod) => {
          const Icon = mod.icon;
          return (
            <Link key={mod.href} href={mod.href}>
              <Card className="h-full transition-colors hover:border-green-300 hover:bg-green-50/50">
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-700 mb-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">{mod.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{mod.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

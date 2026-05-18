"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search } from "lucide-react";

const payments = [
  { id: 1, student: "James Mwangi", admission: "260001", amount: 35000, method: "M-Pesa", ref: "MPE-8A3F2B", date: "2026-01-15", status: "Completed" },
  { id: 2, student: "Grace Akinyi", admission: "260002", amount: 25000, method: "Bank Transfer", ref: "BTX-2026-001", date: "2026-01-20", status: "Completed" },
  { id: 3, student: "Peter Kamau", admission: "260003", amount: 38000, method: "Cash", ref: "CSH-001", date: "2026-02-01", status: "Completed" },
  { id: 4, student: "Faith Chebet", admission: "260004", amount: 10000, method: "M-Pesa", ref: "MPE-7C1D9E", date: "2026-02-10", status: "Pending" },
  { id: 5, student: "David Otieno", admission: "260005", amount: 45000, method: "Cheque", ref: "CHQ-004", date: "2026-03-05", status: "Failed" },
];

export default function PaymentsPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">Record and manage fee payments</p>
        </div>
        <Button className="bg-green-700 hover:bg-green-800">
          <Plus className="mr-2 h-4 w-4" /> Record Payment
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Payment History</CardTitle>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search payments..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead><TableHead>Amount (KES)</TableHead>
                <TableHead>Method</TableHead><TableHead>Reference</TableHead>
                <TableHead>Date</TableHead><TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((p) => (
                <TableRow key={p.id}>
                  <TableCell><span className="font-medium">{p.student}</span><br /><span className="text-xs text-muted-foreground">{p.admission}</span></TableCell>
                  <TableCell className="font-bold">{p.amount.toLocaleString()}</TableCell>
                  <TableCell>{p.method}</TableCell>
                  <TableCell className="font-mono text-xs">{p.ref}</TableCell>
                  <TableCell>{p.date}</TableCell>
                  <TableCell>
                    <Badge variant={p.status === "Completed" ? "success" : p.status === "Pending" ? "warning" : "destructive"}>{p.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right"><Button variant="ghost" size="sm">View</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

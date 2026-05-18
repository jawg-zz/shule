"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, GraduationCap, TrendingUp, AlertTriangle } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here is your school overview.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Students"
          value="1,284"
          change="+12 this term"
          icon={<Users className="h-5 w-5" />}
          trend="up"
        />
        <StatCard
          title="Total Staff"
          value="86"
          change="+3 this term"
          icon={<GraduationCap className="h-5 w-5" />}
          trend="up"
        />
        <StatCard
          title="Fee Collection"
          value="KES 3.2M"
          change="78% collection rate"
          icon={<DollarSign className="h-5 w-5" />}
          trend="up"
        />
        <StatCard
          title="Average Performance"
          value="B-"
          change="Mean score: 8.2 pts"
          icon={<TrendingUp className="h-5 w-5" />}
          trend="up"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {quickActions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="flex items-center gap-3 rounded-lg border p-3 text-sm hover:bg-muted/50 transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-50 text-green-700">
                  {action.icon}
                </div>
                <div>
                  <p className="font-medium">{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </a>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.message} className="rounded-md bg-yellow-50 p-3 text-sm">
                <p className="font-medium text-yellow-800">{alert.message}</p>
                <p className="text-xs text-yellow-600 mt-1">{alert.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Class Performance (Recent Exams)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {classPerformance.map((cls) => (
                <div key={cls.name} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{cls.name}</p>
                    <p className="text-xs text-muted-foreground">{cls.stream}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{cls.meanGrade}</p>
                    <p className="text-xs text-muted-foreground">{cls.meanScore} pts</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Fee Status Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feeSummary.map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <p className="text-sm">{item.label}</p>
                  <p className={`text-sm font-bold ${item.color}`}>{item.amount}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  change,
  icon,
  trend,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: "up" | "down";
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground">{icon}</div>
          <span className={`text-xs font-medium ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
            {trend === "up" ? "+" : "-"}
          </span>
        </div>
        <p className="mt-3 text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  );
}

const quickActions = [
  { label: "Add Student", description: "Enroll a new student", href: "/dashboard/students/new", icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg> },
  { label: "Record Exam", description: "Enter exam results", href: "/dashboard/academics/exams", icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg> },
  { label: "Record Payment", description: "Log a fee payment", href: "/dashboard/finance/payments", icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg> },
  { label: "Take Attendance", description: "Mark today's attendance", href: "/dashboard/attendance", icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg> },
];

const alerts = [
  { message: "Fee payment deadline for Term 2 approaching", time: "Due in 5 days" },
  { message: "End of Term exams start next week", time: "June 15, 2026" },
  { message: "5 students have outstanding balances > KES 50,000", time: "Requires follow-up" },
];

const classPerformance = [
  { name: "Grade 4", stream: "East", meanGrade: "B+", meanScore: "10.2" },
  { name: "Grade 5", stream: "West", meanGrade: "B", meanScore: "9.1" },
  { name: "Form 2", stream: "Science", meanGrade: "B-", meanScore: "8.3" },
  { name: "Form 4", stream: "Combined", meanGrade: "C+", meanScore: "7.5" },
  { name: "Grade 6", stream: "CBC", meanGrade: "ME", meanScore: "82%" },
];

const feeSummary = [
  { label: "Total Billed", amount: "KES 4,125,000", color: "text-blue-600" },
  { label: "Total Collected", amount: "KES 3,217,500", color: "text-green-600" },
  { label: "Outstanding", amount: "KES 907,500", color: "text-red-600" },
  { label: "Collection Rate", amount: "78%", color: "text-green-600" },
];

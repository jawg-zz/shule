"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardCheck,
  DollarSign,
  Calendar,
  Building2,
  BarChart3,
  GraduationCap,
  Timer,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Students", href: "/dashboard/students", icon: Users },
  { title: "Academics", href: "/dashboard/academics", icon: BookOpen },
  { title: "Exams", href: "/dashboard/academics/exams", icon: ClipboardCheck },
  { title: "CBC", href: "/dashboard/academics/cbc", icon: GraduationCap },
  { title: "Finance", href: "/dashboard/finance", icon: DollarSign },
  { title: "Staff", href: "/dashboard/staff", icon: Building2 },
  { title: "Timetable", href: "/dashboard/timetable", icon: Calendar },
  { title: "Attendance", href: "/dashboard/attendance", icon: Timer },
  { title: "Reports", href: "/dashboard/reports", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
      <div className="flex h-14 items-center gap-2 border-b px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-700 text-white text-sm font-bold">
          S
        </div>
        <span className="font-bold text-lg">Shule</span>
      </div>

      <div className="flex flex-col gap-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 font-normal",
                  isActive && "bg-green-50 text-green-800 hover:bg-green-100"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </Button>
            </Link>
          );
        })}
      </div>

      <Separator />

      <div className="p-4">
        <Link href="/dashboard/settings">
          <Button variant="ghost" className="w-full justify-start gap-3 font-normal">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </Link>
      </div>
    </aside>
  );
}

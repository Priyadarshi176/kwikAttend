"use client";

import Link from "next/link";
import {
  BookOpenCheck,
  Home,
  Users,
  CalendarCheck,
  BookCopy,
  BarChart3
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const facultyNavItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/dashboard/attendance", icon: CalendarCheck, label: "Mark Attendance" },
  { href: "/dashboard/reports", icon: BarChart3, label: "Reports" },
  { href: "/dashboard/students", icon: Users, label: "Manage Students" },
  { href: "/dashboard/subjects", icon: BookCopy, label: "Manage Classes" },
];

const studentNavItems = [
  { href: "/dashboard/student", icon: Home, label: "Dashboard" },
];

export function AppSidebar({ role }: { role: "student" | "faculty" }) {
  const pathname = usePathname();
  const navItems = role === "student" ? studentNavItems : facultyNavItems;

  return (
    <div className="hidden border-r bg-muted/40 md:block h-full">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <BookOpenCheck className="h-6 w-6 text-primary" />
            <span className="">KwikAttend</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  pathname === item.href && "bg-muted text-primary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

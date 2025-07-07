"use client";

import { useState } from "react";
import { format } from "date-fns";
import { DayPicker, type DayModifiers } from "react-day-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { attendanceData } from "@/lib/data";

const studentId = "s1"; // Hardcoded for demo

export function AttendanceCalendar() {
  const today = new Date();
  const [month, setMonth] = useState<Date>(today);

  const studentRecords = attendanceData.filter(
    (record) => record.studentId === studentId
  );

  const presentDays = studentRecords
    .filter((r) => r.status === "Present")
    .map((r) => new Date(r.date));
  const absentDays = studentRecords
    .filter((r) => r.status === "Absent")
    .map((r) => new Date(r.date));
  const leaveDays = studentRecords
    .filter((r) => r.status === "Leave")
    .map((r) => new Date(r.date));

  const modifiers: DayModifiers = {
    present: presentDays,
    absent: absentDays,
    leave: leaveDays,
  };

  const modifiersStyles = {
    present: {
      backgroundColor: "hsl(var(--primary) / 0.2)",
      color: "hsl(var(--primary-foreground))",
      fontWeight: "bold",
    },
    absent: {
      backgroundColor: "hsl(var(--destructive) / 0.2)",
      color: "hsl(var(--destructive))",
      fontWeight: "bold",
    },
    leave: {
      backgroundColor: "hsl(var(--accent) / 0.2)",
      color: "hsl(var(--accent-foreground))",
    },
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Attendance Calendar</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <DayPicker
          month={month}
          onMonthChange={setMonth}
          mode="multiple"
          min={0}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          className="w-full"
        />
        <div className="flex items-center space-x-4 mt-4 text-sm">
            <div className="flex items-center space-x-2"><span className="w-3 h-3 rounded-full" style={modifiersStyles.present}></span><span>Present</span></div>
            <div className="flex items-center space-x-2"><span className="w-3 h-3 rounded-full" style={modifiersStyles.absent}></span><span>Absent</span></div>
            <div className="flex items-center space-x-2"><span className="w-3 h-3 rounded-full" style={modifiersStyles.leave}></span><span>Leave</span></div>
        </div>
      </CardContent>
    </Card>
  );
}

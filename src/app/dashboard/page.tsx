import { StatCard } from "@/components/shared/stat-card";
import { Users, BookCopy, BarChart3, CalendarCheck } from "lucide-react";
import { students, subjects, faculty } from "@/lib/data";
import { AttendanceMarker } from "@/components/faculty/attendance-marker";

export default function FacultyDashboard() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <StatCard 
          title="Total Students"
          value={students.length.toString()}
          description="Number of active students"
          Icon={Users}
        />
        <StatCard 
          title="Total Faculties"
          value={faculty.length.toString()}
          description="Number of teaching staff"
          Icon={Users}
        />
        <StatCard 
          title="Total Subjects"
          value={subjects.length.toString()}
          description="Across all departments"
          Icon={BookCopy}
        />
        <StatCard 
          title="Today's Attendance"
          value="Pending"
          description={today}
          Icon={CalendarCheck}
        />
      </div>
      <div>
        <AttendanceMarker />
      </div>
    </>
  );
}

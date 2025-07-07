import { AttendanceCalendar } from "@/components/student/attendance-calendar";
import { SubjectAttendanceCard } from "@/components/student/subject-attendance-card";
import { getStudentAttendanceStats } from "@/lib/data";

export default function StudentDashboard() {
  const studentId = "s1"; // Hardcoded for demo
  const attendanceStats = getStudentAttendanceStats(studentId);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <AttendanceCalendar />
      </div>
      <div className="lg:col-span-2 grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
        {attendanceStats.map((stat) => (
          <SubjectAttendanceCard
            key={stat.subject.id}
            subject={stat.subject}
            percentage={stat.percentage}
            remarks={stat.remarks}
          />
        ))}
      </div>
    </div>
  );
}

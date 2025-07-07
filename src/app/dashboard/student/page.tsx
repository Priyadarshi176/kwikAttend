import { AttendanceCalendar } from "@/components/student/attendance-calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { subjects, attendanceData } from "@/lib/data";

export default function StudentDashboard() {
  const studentId = "s1"; // Hardcoded for demo
  
  const studentRecords = attendanceData.filter((a) => a.studentId === studentId);
  const totalDays = studentRecords.length;
  const presentDays = studentRecords.filter((r) => r.status === "Present").length;
  const overallPercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 100;

  return (
    <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Attendance Percentage</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center">
                    <div className="text-7xl font-bold text-primary">{overallPercentage}%</div>
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <div className="grid gap-2">
                        <Label htmlFor="subject-select">Select Subject</Label>
                        <Select>
                            <SelectTrigger id="subject-select" className="w-full md:w-[280px]">
                                <SelectValue placeholder="All Subjects" />
                            </SelectTrigger>
                            <SelectContent>
                                {subjects.map((subject) => (
                                <SelectItem key={subject.id} value={subject.id}>
                                    {subject.name}
                                </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent>
                     <AttendanceCalendar />
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Subject } from "@/lib/data";
import { NudgeDialog } from "./nudge-dialog";

interface SubjectAttendanceCardProps {
  subject: Subject;
  percentage: number;
  remarks: string;
}

export function SubjectAttendanceCard({
  subject,
  percentage,
  remarks,
}: SubjectAttendanceCardProps) {
  const nudgeInput = {
    studentName: "Alice Johnson", // Hardcoded for demo
    subjectName: subject.name,
    attendancePercentage: percentage,
    facultyRemarks: remarks,
  };
  
  const progressColor =
    percentage < 50
      ? "bg-destructive"
      : percentage < 75
      ? "bg-yellow-500"
      : "bg-primary";

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{subject.name}</CardTitle>
        <CardDescription>Your attendance summary</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-baseline space-x-2">
          <span className="text-4xl font-bold">{percentage}%</span>
          <span className="text-sm text-muted-foreground">attendance</span>
        </div>
        <Progress value={percentage} className="h-2" indicatorClassName={progressColor} />
        <div>
          <h4 className="text-sm font-semibold">Latest Remarks:</h4>
          <p className="text-sm text-muted-foreground italic">"{remarks}"</p>
        </div>
      </CardContent>
      <CardFooter>
        {percentage < 85 && <NudgeDialog input={nudgeInput} />}
      </CardFooter>
    </Card>
  );
}

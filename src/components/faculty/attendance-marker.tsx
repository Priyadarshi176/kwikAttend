"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Check, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { students, subjects, type Student } from "@/lib/data";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

type AttendanceStatus = "Present" | "Absent" | "Leave";

export function AttendanceMarker() {
  const [selectedSubject, setSelectedSubject] = useState<string>(subjects[0].id);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>({});
  const [remarks, setRemarks] = useState<Record<string, string>>({});

  const { toast } = useToast();

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleRemarkChange = (studentId: string, remark: string) => {
    setRemarks((prev) => ({ ...prev, [studentId]: remark }));
  };

  const markAll = (status: AttendanceStatus) => {
    const newAttendance: Record<string, AttendanceStatus> = {};
    students.forEach(student => {
        newAttendance[student.id] = status;
    });
    setAttendance(newAttendance);
  };
  
  const handleSubmit = () => {
    console.log({
        subject: selectedSubject,
        date: selectedDate,
        attendance,
        remarks,
    });
    toast({
        title: "Attendance Submitted",
        description: `Attendance for ${subjects.find(s => s.id === selectedSubject)?.name} on ${format(selectedDate, "PPP")} has been recorded.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mark Attendance</CardTitle>
        <CardDescription>
          Select a subject and date to mark student attendance.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label>Subject</Label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select a subject" />
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
          <div className="grid gap-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => markAll('Present')}><Check className="mr-2 h-4 w-4"/>Mark All Present</Button>
            <Button variant="outline" size="sm" onClick={() => markAll('Absent')}><X className="mr-2 h-4 w-4"/>Mark All Absent</Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No.</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead>Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.rollNumber}</TableCell>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>
                    <RadioGroup
                      className="flex justify-center gap-2 md:gap-4"
                      value={attendance[student.id] || "Present"}
                      onValueChange={(value: AttendanceStatus) => handleStatusChange(student.id, value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Present" id={`p-${student.id}`} />
                        <Label htmlFor={`p-${student.id}`}>Present</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Absent" id={`a-${student.id}`} />
                        <Label htmlFor={`a-${student.id}`}>Absent</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Leave" id={`l-${student.id}`} />
                        <Label htmlFor={`l-${student.id}`}>Leave</Label>
                      </div>
                    </RadioGroup>
                  </TableCell>
                  <TableCell>
                    <Input
                      placeholder="Optional"
                      value={remarks[student.id] || ""}
                      onChange={(e) => handleRemarkChange(student.id, e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="ml-auto">Submit Attendance</Button>
      </CardFooter>
    </Card>
  );
}

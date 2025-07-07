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
} from "@/components/ui/card";
import { students } from "@/lib/data";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export function ManageStudentsTable() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Manage Students</CardTitle>
          <CardDescription>View and manage student information.</CardDescription>
        </div>
        <Button>Add Student</Button>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.slice(0, 3).map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>
                    <Badge variant={student.status === "Present" ? "default" : "destructive"} className={student.status === "Present" ? "bg-green-500/20 text-green-700 border-green-500" : "bg-red-500/20 text-red-700 border-red-500"}>
                      {student.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

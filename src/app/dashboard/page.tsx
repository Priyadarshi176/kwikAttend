import { StatCard } from "@/components/shared/stat-card";
import { Users, BookCopy } from "lucide-react";
import { ManageStudentsTable } from "@/components/faculty/manage-students-table";

export default function FacultyDashboard() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <StatCard 
          title="Total Students"
          value="1,320"
          Icon={Users}
        />
        <StatCard 
          title="Total Faculty"
          value="50"
          Icon={Users}
        />
        <StatCard 
          title="Total Classes"
          value="12"
          Icon={BookCopy}
        />
      </div>
      <div>
        <ManageStudentsTable />
      </div>
    </>
  );
}

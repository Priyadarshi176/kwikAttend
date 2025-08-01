export type Student = {
  id: string;
  name: string;
  rollNumber: string;
  email: string;
  class: string;
  status: "Present" | "Absent";
};

export type Subject = {
  id: string;
  name: string;
  facultyId: string;
};

export type Faculty = {
  id: string;
  name: string;
};

export type AttendanceRecord = {
  studentId: string;
  subjectId: string;
  date: string; // YYYY-MM-DD
  status: "Present" | "Absent" | "Leave";
  remarks?: string;
};

export const students: Student[] = [
  { id: "s1", name: "Smith Johnson", rollNumber: "STU001", email: "smith.j@example.com", class: "Class A", status: "Present" },
  { id: "s2", name: "Emma Williams", rollNumber: "STU002", email: "emma.w@example.com", class: "Class B", status: "Absent" },
  { id: "s3", name: "Olivia Brown", rollNumber: "STU003", email: "olivia.b@example.com", class: "Class A", status: "Present" },
  { id: "s4", name: "Bob Williams", rollNumber: "STU004", email: "bob@example.com", class: "Class B", status: "Present" },
  { id: "s5", name: "Diana Miller", rollNumber: "STU005", email: "diana@example.com", class: "Class C", status: "Absent" },
  { id: "s6", name: "Fiona Garcia", rollNumber: "STU006", email: "fiona@example.com", class: "Class C", status: "Present" },
];

export const faculty: Faculty[] = [
  { id: "f1", name: "Dr. Alan Grant" },
  { id: "f2", name: "Dr. Ellie Sattler" },
];

export const subjects: Subject[] = [
  { id: "sub1", name: "Advanced Mathematics", facultyId: "f1" },
  { id: "sub2", name: "Quantum Physics", facultyId: "f1" },
  { id: "sub3", name: "English Literature", facultyId: "f2" },
  { id: "sub4", name: "Organic Chemistry", facultyId: "f2" },
];

export const attendanceData: AttendanceRecord[] = [
  // Alice Johnson's (now Smith Johnson) attendance
  { studentId: "s1", subjectId: "sub1", date: "2024-07-01", status: "Present" },
  { studentId: "s1", subjectId: "sub1", date: "2024-07-02", status: "Present" },
  { studentId: "s1", subjectId: "sub1", date: "2024-07-03", status: "Absent", remarks: "Fever" },
  { studentId: "s1", subjectId: "sub1", date: "2024-07-04", status: "Present" },
  { studentId: "s1", subjectId: "sub1", date: "2024-07-05", status: "Present" },
  { studentId: "s1", subjectId: "sub1", date: "2024-07-08", status: "Present" },
  { studentId: "s1", subjectId: "sub2", date: "2024-07-01", status: "Present" },
  { studentId: "s1", subjectId: "sub2", date: "2024-07-03", status: "Absent" },
  { studentId: "s1", subjectId: "sub2", date: "2024-07-05", status: "Present" },
  { studentId: "s1", subjectId: "sub3", date: "2024-07-02", status: "Present" },
  { studentId: "s1", subjectId: "sub3", date: "2024-07-04", status: "Leave" },

  // Emma Williams' attendance
  { studentId: "s2", subjectId: "sub1", date: "2024-07-01", status: "Absent" },
  { studentId: "s2", subjectId: "sub1", date: "2024-07-02", status: "Absent" },
  { studentId: "s2", subjectId: "sub1", date: "2024-07-03", status: "Absent" },
  { studentId: "s2", subjectId: "sub1", date: "2024-07-04", status: "Present" },
  { studentId: "s2", subjectId: "sub1", date: "2024-07-05", status: "Present" },
];

// Helper to calculate attendance stats
export const getStudentAttendanceStats = (studentId: string) => {
  const studentRecords = attendanceData.filter(
    (a) => a.studentId === studentId
  );
  const stats = subjects.map((subject) => {
    const subjectRecords = studentRecords.filter(
      (r) => r.subjectId === subject.id
    );
    const totalClasses = subjectRecords.length;
    if (totalClasses === 0) {
      return { subject, percentage: 100, remarks: "No classes yet." };
    }
    const presentClasses = subjectRecords.filter(
      (r) => r.status === "Present"
    ).length;
    const percentage = Math.round((presentClasses / totalClasses) * 100);
    const lastRemark = subjectRecords.slice().reverse().find(r => r.remarks)?.remarks;
    return { subject, percentage, remarks: lastRemark || 'No specific remarks.' };
  });

  return stats;
};

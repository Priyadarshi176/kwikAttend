"use server";

import {
  personalizedAttendanceNudge,
  type PersonalizedAttendanceNudgeInput,
  type PersonalizedAttendanceNudgeOutput,
} from "@/ai/flows/personalized-attendance-nudges";
import { z } from "zod";

const inputSchema = z.object({
  studentName: z.string(),
  subjectName: z.string(),
  attendancePercentage: z.number(),
  facultyRemarks: z.string().optional(),
});

export async function generateNudge(
  input: PersonalizedAttendanceNudgeInput
): Promise<{ data?: PersonalizedAttendanceNudgeOutput; error?: string }> {
  const parsedInput = inputSchema.safeParse(input);

  if (!parsedInput.success) {
    return { error: "Invalid input." };
  }

  try {
    const output = await personalizedAttendanceNudge(parsedInput.data);
    return { data: output };
  } catch (e) {
    console.error(e);
    return { error: "Failed to generate message. Please try again." };
  }
}

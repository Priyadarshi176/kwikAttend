'use server';

/**
 * @fileOverview A personalized attendance nudge generator.
 *
 * - personalizedAttendanceNudge - A function that generates personalized messages to motivate students to improve their attendance.
 * - PersonalizedAttendanceNudgeInput - The input type for the personalizedAttendanceNudge function.
 * - PersonalizedAttendanceNudgeOutput - The return type for the personalizedAttendanceNudge function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedAttendanceNudgeInputSchema = z.object({
  studentName: z.string().describe('The name of the student.'),
  subjectName: z.string().describe('The name of the subject.'),
  attendancePercentage: z.number().describe('The current attendance percentage of the student in the subject.'),
  facultyRemarks: z.string().optional().describe('Optional faculty remarks about the student in the subject.'),
});
export type PersonalizedAttendanceNudgeInput = z.infer<typeof PersonalizedAttendanceNudgeInputSchema>;

const PersonalizedAttendanceNudgeOutputSchema = z.object({
  message: z.string().describe('A personalized message to motivate the student to improve their attendance.'),
});
export type PersonalizedAttendanceNudgeOutput = z.infer<typeof PersonalizedAttendanceNudgeOutputSchema>;

export async function personalizedAttendanceNudge(input: PersonalizedAttendanceNudgeInput): Promise<PersonalizedAttendanceNudgeOutput> {
  return personalizedAttendanceNudgeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedAttendanceNudgePrompt',
  input: {schema: PersonalizedAttendanceNudgeInputSchema},
  output: {schema: PersonalizedAttendanceNudgeOutputSchema},
  prompt: `You are an AI assistant designed to generate personalized messages to motivate students to improve their attendance in specific subjects.

  Student Name: {{{studentName}}}
  Subject Name: {{{subjectName}}}
  Attendance Percentage: {{{attendancePercentage}}}
  Faculty Remarks: {{#if facultyRemarks}}{{{facultyRemarks}}}{{else}}None{{/if}}

  Generate a short, encouraging message to motivate the student to improve their attendance in the subject. The message should be personalized and take into account the student's name, the subject, their current attendance percentage, and any faculty remarks. Focus on the benefits of attending classes regularly and offer suggestions for how the student can improve their attendance. The message should be positive and supportive.
  `,
});

const personalizedAttendanceNudgeFlow = ai.defineFlow(
  {
    name: 'personalizedAttendanceNudgeFlow',
    inputSchema: PersonalizedAttendanceNudgeInputSchema,
    outputSchema: PersonalizedAttendanceNudgeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

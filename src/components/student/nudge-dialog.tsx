"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { generateNudge } from "@/lib/actions";
import { Wand2, Loader2, Frown } from "lucide-react";
import type { PersonalizedAttendanceNudgeInput } from "@/ai/flows/personalized-attendance-nudges";

interface NudgeDialogProps {
  input: PersonalizedAttendanceNudgeInput;
}

export function NudgeDialog({ input }: NudgeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleGenerate = () => {
    startTransition(async () => {
      setError("");
      setMessage("");
      const result = await generateNudge(input);
      if (result.error) {
        setError(result.error);
      } else if (result.data) {
        setMessage(result.data.message);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Wand2 className="mr-2 h-4 w-4" />
          Get Motivated
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Personalized Attendance Nudge</DialogTitle>
          <DialogDescription>
            Here's a little message to help you stay on track with your
            attendance for {input.subjectName}.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {isPending ? (
            <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p>Generating your personalized message...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center gap-2 text-destructive">
                <Frown className="h-8 w-8" />
                <p className="text-center">{error}</p>
            </div>
          ) : message ? (
            <div className="text-center bg-accent/20 p-4 rounded-lg border border-accent">
                <p className="text-accent-foreground">{message}</p>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <p>Click the button below to generate a motivational message.</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleGenerate} disabled={isPending}>
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            {message ? "Regenerate" : "Generate Message"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

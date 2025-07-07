"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, role: "student" | "faculty" | "admin") => {
    event.preventDefault();
    startTransition(() => {
      // Simulate API call
      setTimeout(() => {
        toast({
          title: "Login Successful",
          description: `Welcome! Redirecting to your dashboard.`,
        });
        
        if (role === 'student') {
          router.push("/dashboard/student");
        } else {
          router.push("/dashboard");
        }

      }, 1000);
    });
  };

  return (
    <Tabs defaultValue="student" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="student">Student</TabsTrigger>
        <TabsTrigger value="faculty">Faculty</TabsTrigger>
        <TabsTrigger value="admin">Admin</TabsTrigger>
      </TabsList>
      <TabsContent value="student">
        <form onSubmit={(e) => handleSubmit(e, "student")}>
          <Card>
            <CardHeader>
              <CardTitle>Student Login</CardTitle>
              <CardDescription>
                Enter your student ID and password to view your attendance.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="student-id">Student ID</Label>
                <Input id="student-id" defaultValue="STU001" required />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="student-password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="student-password" type="password" defaultValue="password" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Login as Student
              </Button>
            </CardFooter>
          </Card>
        </form>
      </TabsContent>
      <TabsContent value="faculty">
         <form onSubmit={(e) => handleSubmit(e, "faculty")}>
          <Card>
            <CardHeader>
              <CardTitle>Faculty Login</CardTitle>
              <CardDescription>
                Enter your faculty credentials to manage attendance.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="faculty-email">Email</Label>
                <Input
                  id="faculty-email"
                  type="email"
                  placeholder="m@example.com"
                  defaultValue="alan.grant@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                 <div className="flex items-center">
                  <Label htmlFor="faculty-password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="faculty-password" type="password" defaultValue="password" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Login as Faculty
              </Button>
            </CardFooter>
          </Card>
        </form>
      </TabsContent>
      <TabsContent value="admin">
        <form onSubmit={(e) => handleSubmit(e, "admin")}>
          <Card>
            <CardHeader>
              <CardTitle>Admin Login</CardTitle>
              <CardDescription>
                Enter your admin credentials for system management.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email</Label>
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="admin-password">Password</Label>
                   <a
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="admin-password" type="password" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Login as Admin
              </Button>
            </CardFooter>
          </Card>
        </form>
      </TabsContent>
    </Tabs>
  );
}

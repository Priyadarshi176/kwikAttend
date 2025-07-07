import Image from "next/image";
import { LoginForm } from "@/components/auth/login-form";
import { BookOpenCheck } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Sign in to your account
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
      <div className="hidden bg-muted lg:flex lg:flex-col lg:items-center lg:justify-between p-8">
        <div className="flex items-center gap-2 text-lg font-semibold">
            <BookOpenCheck className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">KwikAttend</span>
        </div>
        <Image
          src="https://placehold.co/800x600.png"
          alt="Image"
          width="1920"
          height="1080"
          data-ai-hint="education technology"
          className="w-full max-w-md rounded-xl object-cover dark:brightness-[0.8]"
        />
        <div className="text-center text-muted-foreground">
            <p className="font-semibold">"The beautiful thing about learning is that nobody can take it away from you."</p>
            <p className="text-sm mt-1">- B.B. King</p>
        </div>
      </div>
    </div>
  );
}

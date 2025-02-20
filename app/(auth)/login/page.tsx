"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GitHub, Google } from "@/components/icons/icons";
import { signIn, useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { CircleUserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && session?.connectionId) {
      router.push("/mail");
    }
  }, [session, isPending, router]);

  if (isPending || (session && session.connectionId)) return null;

  return (
    <div className="flex max-h-dvh min-h-screen w-screen items-center justify-center overflow-hidden border-2 bg-grid-small-black/[0.39] dark:bg-grid-small-white/[0.025]">
      <Card className="relative z-[20] flex h-fit w-[350px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-background/20 py-2 backdrop-blur-xl">
        <CardHeader className="flex items-center justify-center">
          <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/20">
            <CircleUserRound />
          </div>
          <CardTitle className="text-center text-lg font-normal">
            Login into your <span className="font-bold">Mail0</span> account
          </CardTitle>
          <CardDescription className="text-center text-xs">
            Login to your account to continue{" "}
          </CardDescription>
        </CardHeader>
        <CardContent className="my-4 flex w-full flex-col gap-4">
          <Button
            onClick={async () => {
              toast.promise(
                signIn.social({
                  provider: "google",
                  callbackURL: "/mail",
                }),
                {
                  loading: "Redirecting...",
                  success: "Redirected successfully!",
                  error: "Login redirect failed",
                },
              );
            }}
            className="h-9 w-full bg-gradient-to-b from-primary/85 via-primary to-primary/85 hover:bg-primary/40"
          >
            <Google />
            Log In with Google
          </Button>
          <Button
            onClick={async () => {
              toast.promise(
                signIn.social({
                  provider: "github",
                  callbackURL: "/mail",
                }),
                {
                  loading: "Redirecting...",
                  success: "Redirected successfully!",
                  error: "Login redirect failed",
                },
              );
            }}
            className="h-9 w-full bg-gradient-to-b from-primary/85 via-primary to-primary/85 hover:bg-primary/40"
          >
            <GitHub />
            Log In with Github
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

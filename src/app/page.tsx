"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();

  return (
    <main className="h-full flex items-center justify-center">
      {user ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <SignInButton mode="modal">
          <Button>
            Log in
          </Button>
        </SignInButton>
      )}
      <div className="ml-2">
        <ModeToggle />
      </div>
    </main>
  );
}

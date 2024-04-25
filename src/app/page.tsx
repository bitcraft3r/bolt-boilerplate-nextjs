"use client";

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import useStoreUserEffect from "@/hooks/useStoreUserEffect";

export default function Home() {
  const { user } = useUser();
  const userId = useStoreUserEffect();

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

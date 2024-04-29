"use client";

import { useConvexAuth, useMutation } from "convex/react";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { GithubIcon, LoaderCircle, Zap } from "lucide-react";

import useStoreUserEffect from "@/hooks/useStoreUserEffect";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import Link from "next/link";
import { api } from "@/convex/_generated/api";

export const Navbar = () => {
    const userId = useStoreUserEffect();
    const { isAuthenticated, isLoading } = useConvexAuth();
    const scrolled = useScrollTop();
    const incrementCounter = useMutation(api.counters.increment);


    return (
        <div className={cn(
            "z-50 bg-background fixed top-0 flex items-center w-full p-6",
            scrolled && "border-b shadow-sm"
        )}>
            <div className="hidden sm:block">
                <Logo />
            </div>
            <div className="md:ml-auto justify-between sm:justify-end sm:space-between w-full flex items-center gap-x-2">
                {isLoading && (
                    <LoaderCircle className="w-4 h-4 animate-spin" />
                )}
                {!isAuthenticated && !isLoading && (
                    <>
                        <SignInButton mode="modal">
                            <Button variant="ghost" size="sm">
                                Log in
                            </Button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <Button size="sm">
                                Get Bolt free
                                <Zap className="h-4 w-4 ml-2" />
                            </Button>
                        </SignUpButton>
                    </>
                )}
                {isAuthenticated && !isLoading && (
                    <>
                        <UserButton afterSignOutUrl="/" />
                        <Button asChild onClick={() => incrementCounter({ name: "github" })}>
                            <Link href="https://github.com/bitcraft3r/bolt-boilerplate-nextjs/" target="_blank" rel="noopener noreferrer">
                                Download Boilerplate
                                <GithubIcon className="h-4 w-4 ml-2" />
                            </Link>
                        </Button>
                    </>
                )}
                <ModeToggle />
            </div>
        </div>
    )
}
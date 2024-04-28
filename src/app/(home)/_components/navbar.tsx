"use client";

import Link from "next/link";
import { useConvexAuth } from "convex/react";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { ArrowRight, LoaderCircle, TwitterIcon } from "lucide-react";

import useStoreUserEffect from "@/hooks/useStoreUserEffect";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import ShareButton from "./share-button";

export const Navbar = () => {
    const userId = useStoreUserEffect();
    const { isAuthenticated, isLoading } = useConvexAuth();
    const scrolled = useScrollTop();

    return (
        <div className={cn(
            "z-50 bg-background fixed top-0 flex items-center w-full p-6",
            scrolled && "border-b shadow-sm"
        )}>
            <Logo />
            <div className="md:ml-auto justify-end w-full flex items-center gap-x-2">
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
                                Get Liit
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </SignUpButton>
                    </>
                )}
                {isAuthenticated && !isLoading && (
                    <>
                        <ShareButton />
                        <UserButton afterSignOutUrl="/" />
                    </>
                )}
                <ModeToggle />
            </div>
        </div>
    )
}
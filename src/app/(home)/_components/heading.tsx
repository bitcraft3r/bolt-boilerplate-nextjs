"use client";

import Link from "next/link";
import { useConvexAuth } from "convex/react";
import { SignInButton } from "@clerk/nextjs";
import { ArrowRight, CirclePlus, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Heading = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();

    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                CRUD with Convex and Clerk, Made Easy. Welcome to <span className="underline">Boilerplate</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                Next.js boilerplate with real-time database <br />
                and authentication out of the box.
            </h3>
            {isLoading && (
                <div className="w-full flex items-center justify-center">
                    <LoaderCircle className="w-4 h-4 animate-spin" />
                </div>
            )}
            {!isAuthenticated && !isLoading && (
                <SignInButton mode="modal">
                    <Button>
                        Get App free
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                </SignInButton>
            )}
        </div>
    );
}
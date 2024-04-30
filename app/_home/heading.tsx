"use client";

import { SignUpButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { LoaderCircle, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Heading = () => {
    const { isLoading } = useConvexAuth();

    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Supercharge Your Next.js Projects with <span className="underline">Bolt</span> Boilerplate

            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                Build dynamic web apps lightning fast with Bolt: the Next.js framework integrated with Convex for seamless interactions, Clerk for authentication, and Shadcn for stunning UI.

            </h3>
            {isLoading && (
                <div className="w-full flex items-center justify-center">
                    <LoaderCircle className="w-4 h-4 animate-spin" />
                </div>
            )}
            {!isLoading && (
                <SignUpButton mode="modal">
                    <Button>
                        Setup in minutes
                        <Zap className="h-4 w-4 ml-2" />
                    </Button>
                </SignUpButton>
            )}
        </div>
    );
}
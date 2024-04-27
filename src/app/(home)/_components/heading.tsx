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
            {/* Copy for Microblogging app */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Unlimited Likes, Infinite Connections. It's <span className="underline">Liit</span>

            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                Experience microblogging with limitless likes and seamless interactions powered by Convex's real-time database.
            </h3>

            {/* Copy for Boilerplate for Devs */}
            {/* <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Revolutionize Your Development Workflow with <span className="underline">Bolt</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                Experience lightning-fast interactions with Bolt: the NextJS boilerplate for seamless web apps powered by Convex.
            </h3> */}
            {/* 
            Alternative names:
            - Liit Boilerplate
            - NextConvex Kit
            - BoltJS
            - DevBolt
            
            */}

            {isLoading && (
                <div className="w-full flex items-center justify-center">
                    <LoaderCircle className="w-4 h-4 animate-spin" />
                </div>
            )}
            {!isAuthenticated && !isLoading && (
                <>
                    {/* TODO: Replace with new CTA? or ok to remove, and use createPost as CTA for landing hero section? */}
                    {/* <SignInButton mode="modal">
                        <Button>
                            Get Liit
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                    </SignInButton> */}
                </>
            )}
        </div>
    );
}
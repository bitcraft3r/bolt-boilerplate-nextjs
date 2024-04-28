"use client";

import { useConvexAuth } from "convex/react";
import { LoaderCircle } from "lucide-react";

export const Heading = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();

    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Unlimited Likes, Infinite Connections. It&apos;s <span className="underline">Liit</span>

            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                Experience microblogging with limitless likes and seamless interactions powered by Convex&apos;s real-time database.
            </h3>
            {isLoading && (
                <div className="w-full flex items-center justify-center">
                    <LoaderCircle className="w-4 h-4 animate-spin" />
                </div>
            )}
        </div>
    );
}
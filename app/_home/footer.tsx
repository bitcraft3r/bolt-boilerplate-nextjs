"use client";

import Link from "next/link"
import { SignInButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { GithubIcon, TwitterIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Logo } from "./logo"
import ShareButton from "./share-button";

const buttonData = [
    { name: "github", icon: <GithubIcon />, link: "https://github.com/bitcraft3r/bolt-boilerplate-nextjs/" },
    { name: "twitter", icon: <TwitterIcon />, link: "https://twitter.com/bitcraft3r" },
];

export const Footer = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();

    return (
        <footer className="flex items-center w-full p-6 bg-background z-50">
            <Logo />
            <div className="md:ml-auto w-full justify-end flex items-center gap-x-2 text-muted-foreground">
                {buttonData.map((button, index) => (
                    // make github button a sign in button if user is not authenticated
                    (!isAuthenticated && button.name === "github")
                        ?
                        <SignInButton mode="modal" key={index}>
                            <Button
                                variant="ghost"
                                size="sm"
                            >
                                {button.icon}
                            </Button>
                        </SignInButton>
                        :
                        <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            asChild
                        >
                            <Link href={button.link} target="_blank" rel="noopener noreferrer">
                                {button.icon}
                            </Link>
                        </Button>
                ))}
                <ShareButton />
            </div>
        </footer>
    )
}
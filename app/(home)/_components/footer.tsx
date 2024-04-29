import Link from "next/link"
import { BotMessageSquareIcon, GithubIcon, SendIcon, TwitterIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Logo } from "./logo"
import { useConvexAuth, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import ShareButton from "./share-button";
import { SignInButton } from "@clerk/nextjs";

const buttonData = [
    // { name: "telegram", icon: <SendIcon />, link: "https://t.me/" },
    // { name: "discord", icon: <BotMessageSquareIcon />, link: "https://discord.com/" },
    { name: "github", icon: <GithubIcon />, link: "https://github.com/sov3333/bolt-boilerplate-nextjs/" },
    { name: "twitter", icon: <TwitterIcon />, link: "https://twitter.com/sov6900" },
];

export const Footer = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();

    const incrementCounter = useMutation(api.counters.increment);

    return (
        <div className="flex items-center w-full p-6 bg-background z-50">
            <Logo />
            <div className="md:ml-auto w-full justify-end flex items-center gap-x-2 text-muted-foreground">
                {buttonData.map((button, index) => (
                    // make github button a sign in button if user is not authenticated
                    (isAuthenticated || button.name !== "github")
                        ?
                        <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            asChild
                            onClick={() => incrementCounter({ name: button.name })}
                        >
                            <Link href={button.link} target="_blank" rel="noopener noreferrer">
                                {button.icon}
                            </Link>
                        </Button>
                        :
                        <SignInButton mode="modal" key={index}>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => incrementCounter({ name: button.name })}
                            >
                                {button.icon}
                            </Button>
                        </SignInButton>
                ))}
                <ShareButton />
            </div>
        </div>
    )
}
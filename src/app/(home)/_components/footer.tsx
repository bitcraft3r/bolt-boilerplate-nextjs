import Link from "next/link"
import { BotMessageSquareIcon, GithubIcon, SendIcon, TwitterIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Logo } from "./logo"

const buttonData = [
    { icon: <TwitterIcon />, link: "https://twitter.com/" },
    { icon: <SendIcon />, link: "https://t.me/" },
    { icon: <BotMessageSquareIcon />, link: "https://discord.com/" },
    { icon: <GithubIcon />, link: "https://github.com/" }
];

export const Footer = () => {
    return (
        <div className="flex items-center w-full p-6 bg-background z-50">
            <Logo />
            <div className="md:ml-auto w-full justify-end flex items-center gap-x-2 text-muted-foreground">
                {buttonData.map((button, index) => (
                    <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        asChild
                        onClick={() => { /* Handle button click */ }}
                    >
                        <Link href={button.link} target="_blank" rel="noopener noreferrer">
                            {button.icon}
                        </Link>
                    </Button>
                ))}
            </div>
        </div>
    )
}
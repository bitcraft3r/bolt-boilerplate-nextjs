import Link from "next/link"
import { GithubIcon, TwitterIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Logo } from "./logo"

export const Footer = () => {
    return (
        <div className="flex items-center w-full p-6 bg-background z-50">
            <Logo />
            <div className="md:ml-auto w-full justify-end flex items-center gap-x-2 text-muted-foreground">
                <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    // TODO: Add counter to record clicks on footer buttons
                    onClick={() => { }}
                >
                    <Link href="https://github.com/" target="_blank" rel="noopener noreferrer">
                        <GithubIcon />
                    </Link>
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    // TODO: Add counter to record clicks on footer buttons
                    onClick={() => { }}
                >
                    <Link href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                        <TwitterIcon />

                    </Link>
                </Button>
            </div>
        </div>
    )
}
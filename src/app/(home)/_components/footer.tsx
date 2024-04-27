import { Button } from "@/components/ui/button"
import { Logo } from "./logo"
import { GithubIcon, TwitterIcon } from "lucide-react"

export const Footer = () => {
    return (
        <div className="flex items-center w-full p-6 bg-background z-50">
            <Logo />
            <div className="md:ml-auto w-full justify-end flex items-center gap-x-2 text-muted-foreground">
                <Button variant="ghost" size="sm">
                    {/* TODO: Add click actions, add asChild to Button */}
                    <GithubIcon />
                </Button>
                <Button variant="ghost" size="sm">
                    <TwitterIcon />
                </Button>
            </div>
        </div>
    )
}
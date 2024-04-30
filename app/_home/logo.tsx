import { Poppins } from "next/font/google";
import { Zap } from "lucide-react";

import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"]
});

export const Logo = () => {
    return (
        <div className="flex items-center gap-x-2">
            <Zap color="orange" fill="gold" className="h-[40px] w-[40px] rounded-full p-2 bg-neutral-100 dark:hidden" />
            <Zap color="orange" fill="gold" className="h-[40px] w-[40px] rounded-full p-2 bg-neutral-900 hidden dark:block" />
            <p className={cn("font-semibold text-xl", font.className)}>
                Bolt
            </p>
        </div>
    )
}
// import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"]
});

export const Logo = () => {
    return (
        <div className="flex items-center gap-x-2">
            {/* <Image
                src="/logo.svg"
                height="40"
                width="40"
                alt="Logo"
                className="dark:hidden"
            />
            <Image
                src="/logo-dark.svg"
                height="40"
                width="40"
                alt="Logo"
                className="hidden dark:block"
            /> */}
            <Flame color="red" fill="orange" className="h-[40px] w-[40px] rounded-full p-2 bg-neutral-100 dark:hidden" />
            <Flame color="red" fill="orange" className="h-[40px] w-[40px] rounded-full p-2 bg-neutral-900 hidden dark:block" />
            <p className={cn("font-semibold text-xl", font.className)}>
                Liit
            </p>
        </div>
    )
}
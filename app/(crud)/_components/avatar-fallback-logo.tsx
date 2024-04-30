import { Zap } from "lucide-react";

import { AvatarFallback } from "@/components/ui/avatar";

const AvatarFallbackLogo = () => {
    return (<AvatarFallback>
        <Zap color="orange" fill="gold" className="h-[40px] w-[40px] rounded-full p-2 bg-neutral-100 dark:hidden" />
        <Zap color="orange" fill="gold" className="h-[40px] w-[40px] rounded-full p-2 bg-neutral-900 hidden dark:block" />
    </AvatarFallback>);
}

export default AvatarFallbackLogo;
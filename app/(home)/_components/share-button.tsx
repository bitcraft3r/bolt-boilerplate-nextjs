import Link from "next/link";
import { useMutation } from "convex/react";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";

const ShareButton = () => {
    const incrementCounter = useMutation(api.counters.increment);

    const tweetText = encodeURIComponent(`⚡ Supercharge your Next.js projects with Bolt Boilerplate! Integrated with @Convex_dev for seamless interactions, @ClerkDev for authentication, and @shadcn for stunning UI. Setup in minutes.\n\nTry now! https://getbolt.vercel.app/ #BoltBoilerplate #NextJS #WebDevelopment @sov6900`);

    return (
        <>
            <Button variant="secondary" asChild onClick={() => incrementCounter({ name: "shareButton" })}>
                <Link
                    className="twitter-share-button"
                    data-size="large"
                    href={`https://twitter.com/intent/tweet?text=${tweetText}`}
                    target="_blank" rel="noopener noreferrer"
                >
                    Share on 𝕏
                </Link>
            </Button>
        </>
    );
}

export default ShareButton;
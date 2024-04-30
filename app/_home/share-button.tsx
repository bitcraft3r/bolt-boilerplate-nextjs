import Link from "next/link";

import { Button } from "@/components/ui/button";

const ShareButton = () => {
    const tweetText = encodeURIComponent(`Supercharge your Next.js projects with Bolt Boilerplate! Integrated with @Convex_dev for seamless interactions, @ClerkDev for authentication, and @shadcn for stunning UI. Setup in minutes.\n\nTry ⚡ now! https://getbolt.vercel.app/ #BoltBoilerplate #NextJS #WebDevelopment @bitcraft3r`);

    return (
        <>
            <Button variant="secondary" asChild>
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
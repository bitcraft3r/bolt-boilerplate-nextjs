import Link from "next/link";
import { useMutation } from "convex/react";
import { TwitterIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";

const ShareButton = () => {
    const incrementCounter = useMutation(api.counters.increment);

    const tweetText = encodeURIComponent(`Join me on @Get_Liit, the microblogging platform that's changing the game. Unlimited likes and seamless interactions, powered by #Convex's real-time magic. 🔥 #Liit #NextJS \n\nhttps://getliit.vercel.app/`);

    return (
        <>
            <Button variant="ghost" asChild onClick={() => incrementCounter({ name: "shareButton" })}>
                <Link
                    className="twitter-share-button"
                    data-size="large"
                    href={`https://twitter.com/intent/tweet?text=${tweetText}`}
                    target="_blank" rel="noopener noreferrer"
                >
                    <TwitterIcon />
                    {/* <TwitterIcon className="h-5 w-5 mr-2" /> */}
                    {/* Share on 𝕏 */}
                </Link>
            </Button>
        </>
    );
}

export default ShareButton;
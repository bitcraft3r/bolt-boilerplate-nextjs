import Image from "next/image";
import Link from "next/link";

const logos = [
    { src: "/nextjs.png", alt: "Nextjs Logo", width: 100, height: 30, href: "https://nextjs.org/" },
    { src: "/convex.png", alt: "Convex Logo", width: 150, height: 30, href: "https://www.convex.dev/" },
    { src: "/clerk.png", alt: "Clerk Logo", width: 90, height: 30, href: "https://clerk.com/" },
    { src: "/shadcn.png", alt: "Shadcn Logo", width: 140, height: 30, href: "https://ui.shadcn.com/" },
]

const Partners = () => {
    return (
        <section className="flex flex-col gap-y-4 py-4">
            <div className="text-muted-foreground text-md font-semibold pb-2">Powered by</div>
            <div className="flex justify-center items-center gap-x-12 gap-y-8 flex-wrap">
                {logos.map((logo, index) => (
                    <div key={index} className="relative" style={{ width: `${logo.width}px`, height: `${logo.height}px` }}>
                        <Link href={logo.href} target="_blank" rel="noopener noreferrer">
                            <Image src={logo.src} alt={logo.alt} fill={true} sizes="(max-width: 150px)" style={{ objectFit: "contain" }} />
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Partners;

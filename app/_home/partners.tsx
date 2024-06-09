import Image from "next/image";

const logos = [
    { src: "/nextjs.png", alt: "Nextjs Logo", width: 100, height: 30 },
    { src: "/convex.png", alt: "Convex Logo", width: 150, height: 30 },
    { src: "/clerk.png", alt: "Clerk Logo", width: 90, height: 30 },
    { src: "/shadcn.png", alt: "Shadcn Logo", width: 140, height: 30 },
]

const Partners = () => {
    return (
        <section className="flex flex-col gap-y-4 py-4">
            <div className="text-muted-foreground text-md font-semibold pb-2">Powered by</div>
            <div className="flex justify-center items-center gap-x-12 gap-y-8 flex-wrap">
                {logos.map((logo, index) => (
                    <div key={index} className="relative" style={{ width: `${logo.width}px`, height: `${logo.height}px` }}>
                        <Image src={logo.src} alt={logo.alt} fill={true} sizes="(max-width: 150px)" style={{ objectFit: "contain" }} />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Partners;

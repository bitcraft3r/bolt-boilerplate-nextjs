// import Image from "next/image";

import CreatePost from "../_crud/create-post"
import ShowPosts from "../_crud/show-posts"

export const Hero = () => {
    return (
        <div className="flex flex-col items-center justify-center max-w-5xl">
            <div className="mt-2">
                <CreatePost />
                <ShowPosts />
            </div>
            {/* <div className="flex items-center">
                <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
                    <Image
                        src="/image.png"
                        fill
                        className="object-contain dark:hidden"
                        alt="Image"
                    />
                    <Image
                        src="/image-dark.png"
                        fill
                        className="object-contain hidden dark:block"
                        alt="Image"
                    />
                    <div className="h-[300px] w-[300px] border-4 rounded-sm sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]" />
                </div>
            </div> */}
        </div>
    )
}
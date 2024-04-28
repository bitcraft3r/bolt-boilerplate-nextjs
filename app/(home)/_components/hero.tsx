import { AllPosts } from "../(crud)/_components/all-posts"
import CreatePost from "../(crud)/_components/create-post"

export const Hero = () => {
    return (
        <div className="flex flex-col items-center justify-center max-w-5xl">
            <div className="mt-2">
                <CreatePost />
                <AllPosts />
            </div>
        </div>
    )
}
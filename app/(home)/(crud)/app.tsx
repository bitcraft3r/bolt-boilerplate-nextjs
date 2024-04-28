import CreatePost from "./_components/create-post"
import { AllPosts } from "./_components/all-posts"

export const App = () => {
    return (
        <div className="w-full md:w-[90%] lg:w-[80%]">
            <CreatePost />
            <AllPosts />
        </div>
    )
}
import CreatePost from "./create-post"
import { AllPosts } from "../_crud/_components/all-posts"

export const App = () => {
    return (
        <div className="w-full md:w-[90%] lg:w-[80%]">
            <CreatePost />
            <AllPosts />
        </div>
    )
}
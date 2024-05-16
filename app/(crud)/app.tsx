import CreatePost from "./create-post"
import { AllPosts } from "./all-posts"

export const App = () => {
    return (
        <div className="w-full flex">
            <div className="flex-1">
                <CreatePost />
                <AllPosts />
            </div>
        </div>
    )
}
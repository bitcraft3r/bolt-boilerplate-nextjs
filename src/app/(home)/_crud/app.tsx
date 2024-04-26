import CreatePost from "./create-post"
import ShowPosts from "./show-posts"

export const App = () => {
    return (
        <div className="w-full md:w-[90%] lg:w-[80%]">
            <CreatePost />
            <ShowPosts />
        </div>
    )
}
import { BackLink } from "../_components/backlink";
import { UserProfile } from "./user-profile";
import { UserPosts } from "./user-posts";


export default function Profile({ params }: { params: { username: string } }) {
    return (
        <div className="flex flex-col justify-center items-center">
            <BackLink />
            <UserProfile username={params.username} />
            <div className="border border-t-2 rounded-sm">
                <UserPosts username={params.username} />

            </div>
        </div>
    );
}
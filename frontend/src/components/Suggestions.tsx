import { suggestedUser } from "../types/types";
import { Avatar } from "@mui/material";
import useUserSuggestions from "../(hooks)/useUserSuggestions";
import useFollowUnfollowMutation from "../(hooks)/useFollowUnfollowMutation";



export default function Suggestions({ user_id }: { user_id: number }) {

    const { suggestions } = useUserSuggestions(user_id);

    if (!suggestions.length) return <h4>No suggestions available.</h4>

    return (
        <div className="shadow-md flex flex-col overflow-hidden rounded-md row-span-3 bg-secondary space-y-3 overflow-y-auto  p-4">
            <h4>Suggestions for you.</h4>
            <ul className="overflow-scroll flex-1 ">
                {
                    suggestions.map((user) => (
                        <User dbUserId={user_id} key={user.id} user={user} />
                    ))
                }
            </ul>
        </div>
    )
}


function User({ dbUserId, user }: { dbUserId: number, user: suggestedUser }) {

    const { handleFollowUnfollow, isFollowing } = useFollowUnfollowMutation(user, dbUserId);

    return (
        <li className="flex space-x-2 pl-2 justify-between items-center">
            <div className="flex items-center space-x-3">
                <div className="size-12 flex justify-center items-center">
                    <Avatar src={user.avatar} alt={user.username} />
                </div>
                <h4>{user.username}</h4>
            </div>

            <div className="space-x-3">
                <button
                    onClick={handleFollowUnfollow}
                    className="bg-primary px-3 text-xs font-bold rounded-sm"
                    type="button"
                >
                    {
                        isFollowing ? "Unfollow" : "Follow"
                    }
                </button>
            </div>
        </li>
    )
}
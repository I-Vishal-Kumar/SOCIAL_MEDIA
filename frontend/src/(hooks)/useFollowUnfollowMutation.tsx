import { useState } from "react";
import { supabase } from "../(clients)/suparbaseClient";
import { suggestedUser } from "../types/types";

const useFollowUnfollowMutation = (user: suggestedUser, dbUserId: number) => {

    const [isFollowing, setIsFollowing] = useState(user.is_following)

    const handleFollowUnfollow = async () => {
        try {
            if (isFollowing) {
                // Unfollow: Remove the record from the followers_list
                const { error } = await supabase
                    .from("folowers_list")
                    .delete()
                    .eq("folower_id", dbUserId)
                    .eq("folowing_id", user.id);

                if (error) throw error;
                setIsFollowing(false);

            } else {
                // Follow: Insert the record into the followers_list
                const { error } = await supabase
                    .from("folowers_list")
                    .insert([
                        {
                            folower_id: dbUserId,
                            folowing_id: user.id,
                        },
                    ]);

                if (error) throw error;
                setIsFollowing(true);
            }
        } catch (error) {
            console.error("Error following/unfollowing user:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return { isFollowing, handleFollowUnfollow };
}
export default useFollowUnfollowMutation;
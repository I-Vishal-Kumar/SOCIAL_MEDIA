import { User } from "@auth0/auth0-react";
import { useState, useCallback, SyntheticEvent, useEffect } from "react";
import { graphqlClient } from "../(clients)/graphqlClient";
import { supabase } from "../(clients)/suparbaseClient";
import { SEARCH_USERS_QUERY } from "../(queries)/queries";
import { data, taggedInUser } from "../types/types";

const useUserTagMutation = (postId: number) => {


    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [taggedUsers, setTaggedUsers] = useState<taggedInUser[]>([]);

    // Function to fetch users from the server
    const fetchUsers = useCallback(async (searchTerm: string) => {
        if (!searchTerm) return; // Don't make requests for empty search terms

        setLoading(true);
        try {
            const data: { usersCollection: data } = await graphqlClient.request(SEARCH_USERS_QUERY, { searchTerm });
            // @ts-ignore
            setUsers(data.usersCollection.edges.map(edge => edge.node));
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Handle input change
    const handleInputChange = (_: SyntheticEvent, value: string) => {
        setSearchTerm(value);
    };


    const handleTagUser = async () => {

        if (!selectedUser || !postId) {
            // Handle the case where no user or post is selected.
            alert("Please select a user and post to tag.");
            return;
        }

        try {
            // Insert the tag into the tags table
            const { data, error } = await supabase
                .from('tags')
                .insert([
                    {
                        post_id: postId,  // Assuming you have postId available
                        tagged_user_id: selectedUser.id, // The selected user's ID
                    }
                ]).select(`
                id,
                tagged_user_id,
                users (
                    id,
                    username,
                    avatar
                )
            `) as unknown as { data: { tagged_user_id: number; users: { avatar: string | null; username: string } }[]; error: Error }

            if (error || !data) {
                console.error("Error tagging user:", error);
                alert("Error tagging user.");
                return;
            }

            // Optionally, update UI or notify user
            alert("User tagged successfully!");

            const insertedUser = data[0]

            if (!insertedUser) return;

            setSelectedUser(null);

            setTaggedUsers(prev => [...prev, {
                avatar: insertedUser.users.avatar,
                id: insertedUser.tagged_user_id,
                username: insertedUser.users.username,
            }]);

        } catch (error) {
            console.error("Error tagging user:", error);
            alert("An error occurred while tagging.");
        }
    };

    const fetchTaggedUsers = async (postId: number) => {
        try {
            const { data, error } = await supabase
                .from('tags')
                .select(`
                    id,
                    tagged_user_id,
                    users (
                        id,
                        username,
                        avatar
                    )
                `)
                .eq('post_id', postId);

            if (error) {
                console.error("Error fetching tagged users:", error);
                return;
            }

            // If successful, process the tagged users data
            const taggedUsers = data.map((tag: any) => tag.users);
            setTaggedUsers(taggedUsers);
        } catch (error) {
            console.error("Error fetching tagged users:", error);
        }
    };

    useEffect(() => {
        const timeOut = setTimeout(() => {
            fetchUsers(searchTerm)
        }, 500);
        return () => {
            if (timeOut) clearTimeout(timeOut);
        }
    }, [searchTerm]);


    useEffect(() => {
        const timeOut = setTimeout(() => {
            fetchTaggedUsers(postId);
        }, 500);

        return () => {
            if (timeOut) clearTimeout(timeOut);
        }

    }, [postId]);

    return { searchTerm, setSearchTerm, selectedUser, users, loading, setSelectedUser, taggedUsers, setTaggedUsers, handleInputChange, handleTagUser }
}

export default useUserTagMutation
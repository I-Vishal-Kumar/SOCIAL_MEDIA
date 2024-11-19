import { useState, useEffect } from "react";
import { graphqlClient } from "../(clients)/graphqlClient";
import { GET_SUGGESTIONS } from "../(queries)/queries";
import { suggestedUser, suggestionData } from "../types/types";

const useUserSuggestions = (user_id: number) => {
    const [suggestions, setSuggestions] = useState<suggestedUser[]>([]);

    useEffect(() => {
        const getSuggestions = async (user_id: number) => {
            let data: suggestionData = await graphqlClient.request(GET_SUGGESTIONS, { user_id });
            const collectionData = data.usersCollection;

            const simplifiedData = collectionData.edges.map(({ node }) => ({
                username: node.username,
                id: node.id,
                avatar: node.avatar,
                is_following: node.folowers_listCollection.edges.length > 0 // Check if there are followers (edges)
            }));
            setSuggestions(simplifiedData || [])
        }
        getSuggestions(user_id)
    }, []);

    return { suggestions, setSuggestions };

}

export default useUserSuggestions;
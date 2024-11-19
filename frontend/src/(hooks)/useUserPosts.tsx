import { useState, useEffect } from "react";
import { graphqlClient } from "../(clients)/graphqlClient";
import { GET_POSTS } from "../(queries)/queries";
import { data, post } from "../types/types";

const useUserPosts = () => {

    const [posts, setPosts] = useState<post[]>([]);

    const getPosts = async () => {
        try {
            const data: { postsCollection: data } = await graphqlClient.request(GET_POSTS);
            const fetchedPosts = data?.postsCollection?.edges.map(edge => edge.node) || [];

            setPosts(fetchedPosts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {

        getPosts();
    }, []);

    return { posts, setPosts }
}
export default useUserPosts
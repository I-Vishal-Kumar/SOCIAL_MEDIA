import ParticularPost from "./ParticularPost";
import { post } from "../../types/types";


const RenderPosts = ({ posts }: { posts: post[] }) => {

    return (
        <div className="space-y-4">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <ParticularPost
                        id={post.id}
                        key={post.id}
                        fileUrl={post.file_url}
                        caption={post.caption}
                        createdAt={post.created_at}

                        avatar={post.users.avatar}
                        username={post.users.username}
                        email={post.users.email}
                    />
                ))
            ) : (
                <p>Loading posts...</p>
            )}
        </div>
    );
}

export default RenderPosts;

import useUserPosts from "../../(hooks)/useUserPosts";
import { dbUserType } from "../../types/types";
import CreatePost from "./CreatePost";
import RenderPosts from "./RenderPost";

const PostSection = ({ dbUser }: { dbUser: dbUserType }) => {

    const { posts, setPosts } = useUserPosts();

    return (
        <>
            <div>
                <CreatePost setPosts={setPosts} dbUser={dbUser} />
            </div>
            <div className=" flex-1 overflow-auto flex flex-col gap-y-3 ">
                <RenderPosts posts={posts} />
            </div>
        </>
    )
}
export default PostSection;
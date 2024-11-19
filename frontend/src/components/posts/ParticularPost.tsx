import { postsType } from "../../types/types";
import TaggedSection from "./TaggedSection";

const ParticularPost = ({ id, avatar, username, email, caption, createdAt, fileUrl }: postsType) => {

    const relativeTime = new Date(createdAt).toLocaleString();

    return (
        <div className="rounded-md w-full px-4 py-2 shadow-md bg-blue-50">
            <header className="flex justify-between">
                <div className="flex space-x-4 items-center">
                    <div className="size-8 flex justify-center items-center">
                        {avatar ? (
                            <img src={avatar} alt={username} className="size-8 rounded-full" />
                        ) : (
                            <span className="size-8 rounded-full bg-blue-500"></span>
                        )}
                    </div>
                    <div className="space-y-1">
                        <h4 className="font-bold">{username || "Anonymous"}</h4>
                        <h5>{email}</h5>
                        <h5 className="text-gray-500 text-sm">{relativeTime}</h5>
                    </div>
                </div>
                <div>...</div>
            </header>
            <p className="text-sm p-2">
                {caption || "No caption provided."}
            </p>
            {/* Image/File section */}
            <div className="flex p-2 justify-between">
                {fileUrl ? (
                    <img src={fileUrl} alt="Post Media" className="rounded-md w-full" />
                ) : (
                    <p className="text-gray-500">No media attached.</p>
                )}
            </div>
            <TaggedSection postId={id} />
        </div>
    );
}

export default ParticularPost;
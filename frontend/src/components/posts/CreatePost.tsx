import { TextField } from "@mui/material";
import usePostCreateMutation from "../../(hooks)/usePostCreateMutation";
import { dbUserType, post } from "../../types/types";
import { SetStateAction } from "react";

const CreatePost = ({ setPosts, dbUser }: { setPosts: React.Dispatch<SetStateAction<post[]>>, dbUser: dbUserType }) => {

    const {
        handleMediaChange, handleSubmit,
        isCreatingPost, previewUrl, setCaption,
        setPopup, setMedia, setPreviewUrl, caption } = usePostCreateMutation(dbUser, setPosts);

    return (
        <>
            <button
                type="button"
                onClick={() => setPopup(true)}
                className="bg-blue-500 px-2 py-1 text-white rounded-md shadow-md"
            >
                Create post
            </button>
            {isCreatingPost && (
                <div
                    onClick={() => setPopup(false)}
                    className="absolute top-0 grid place-items-center left-0 h-full w-full bg-gray-500/50"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-4/5 max-w-[500px]  z-10 flex flex-col justify-center items-center rounded-md bg-white p-4"
                    >
                        <h2 className="text-lg font-semibold mb-4">Create a New Post</h2>

                        {/* Media Upload Section */}
                        {!previewUrl ? (
                            <div className="mb-4 text-center">
                                <div className="h-40 flex items-center justify-center">
                                    <label
                                        htmlFor="media-upload"
                                        className="block text-gray-700 font-medium mb-2"

                                    >
                                        Upload Media
                                    </label>
                                </div>
                                <input
                                    type="file"
                                    id="media-upload"
                                    accept="image/*"
                                    onChange={handleMediaChange}
                                    className="block w-full text-sm text-gray-600 border border-gray-300 rounded-md cursor-pointer focus:outline-none"
                                />
                            </div>
                        ) : (
                            <div className="mb-4 flex justify-center items-center flex-col">
                                <h3 className="text-gray-700 font-medium mb-2">Media Preview:</h3>
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-full h-auto rounded-md mb-2"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMedia(null);
                                        setPreviewUrl(null);
                                    }}
                                    className="bg-red-500 px-3 py-1 text-white rounded-md shadow-md"
                                >
                                    Reupload Media
                                </button>
                            </div>
                        )}

                        {
                            previewUrl ? (
                                <div className="w-full">
                                    <h4 className="py-2">Enter a caption</h4>
                                    <TextField value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Enter a caption" fullWidth color="secondary" title="Enter a caption" />
                                </div>
                            ) : null
                        }

                        {/* Submit Button */}
                        <div className="mt-4">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="bg-green-500 px-4 py-2 text-white rounded-md shadow-md mr-2"
                            >
                                Submit Post
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setMedia(null);
                                    setPreviewUrl('');
                                    setPopup(false)
                                }}
                                className="bg-gray-300 px-4 py-2 rounded-md shadow-md"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreatePost;
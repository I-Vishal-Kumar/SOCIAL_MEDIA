import { SetStateAction, useState } from "react";
import { supabase } from "../(clients)/suparbaseClient";
import { dbUserType, post } from "../types/types";

const usePostCreateMutation = (dbUser: dbUserType, setPosts: React.Dispatch<SetStateAction<post[]>>) => {

    const [isCreatingPost, setPopup] = useState(false);
    const [media, setMedia] = useState<File | null>(null);
    const [caption, setCaption] = useState<string>("");
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setMedia(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        if (!media) {
            alert("Please select a media file before submitting!");
            return;
        }

        try {
            const fileName = `${ Date.now() }-${ media.name }`
            const { data: _, error: uploadError } = await supabase.storage
                .from('post-image')
                .upload(`public/${ fileName }`, media);

            if (uploadError) {
                console.error('Error uploading file:', uploadError.message);
                alert('Failed to upload file.');
                return;
            }

            const { data: fileUrlData } = supabase.storage
                .from('post-image')
                .getPublicUrl(`public/${ fileName }`);

            const mediaUrl = fileUrlData?.publicUrl;

            // Save post details in Supabase Database
            const { error: insertError } = await supabase
                .from('posts')
                .insert({
                    user_id: dbUser.id,
                    file_url: mediaUrl,
                    caption: caption || '',
                });

            if (insertError) {
                console.error('Error inserting post:', insertError.message);
                alert('Failed to save post.');
                return;
            }

            setPosts(prev => ([...prev, {
                id: Math.random() * 1000,
                caption,
                file_url: mediaUrl,
                created_at: new Date().toDateString(),
                users: {
                    id: dbUser.id,
                    username: dbUser.username,
                    email: dbUser.email,
                    avatar: dbUser.avatar
                }
            }]))

            alert('Post created successfully!');

        } catch (error) {
            alert('failed to create the post');

        }
        setMedia(null);
        setPreviewUrl(null);
        setPopup(false);
    };

    return { handleMediaChange, setMedia, setPreviewUrl, caption, handleSubmit, setPopup, setCaption, previewUrl, isCreatingPost }

}

export default usePostCreateMutation;
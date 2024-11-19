/**
 *  1. user login auth0
 *  2. news feed with posts. (will not do this )
 *  3. Infinite scrolling.
 *  4. users posting. done.
 *  5. users taggin . done.
 *  6. writing tests (pending)
 *  7. catagorizing
 *  8. Follow unfollow 
 */

import { User } from "@auth0/auth0-react";
import { Avatar } from "@mui/material";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaGlobe, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaFacebook, FaLocationPin } from "react-icons/fa6";
import { MdMailOutline } from "react-icons/md";
import { dbUserType } from "../../types/types";
import PostSection from "../../components/posts/PostsSection";

const ProfileSection = ({ dbUser, user }: { dbUser: dbUserType; user: User | undefined }) => (
    <section className="md:w-[50%] w-full">
        {/* avatar section */}
        <main className="px-4 mt-20 h-[88%] flex flex-col p-3 space-y-3">

            <div className="rounded-md shadow-md space-y-3 bg-secondary w-full py-4 flex flex-col justify-center items-center">
                <div className="relative py-2 ">
                    <h3>{user?.name}</h3>
                    <div className="absolute flex justify-center items-center shadow-md bottom-full size-24 rounded-full">
                        <Avatar src={user?.picture} alt={user?.name} />
                    </div>
                </div>
                <div className="flex  justify-between w-full px-4">
                    {/* social links */}
                    <div className="flex space-x-4">
                        <FaFacebook />
                        <FaInstagram />
                        <FaLinkedin />
                    </div>
                    {/* location values */}
                    <div className="flex space-x-4">
                        <span className="flex space-x-2">
                            <FaLocationPin />
                            <h4>India</h4>
                        </span>
                        <span className="flex space-x-2">
                            <FaGlobe />
                            <h4>Jharkhand , Giridih</h4>
                        </span>
                    </div>
                    {/* email and other sectioin */}
                    <div className="flex space-x-2">
                        <MdMailOutline />
                        <BsThreeDotsVertical />
                    </div>
                </div>
            </div>

            <PostSection dbUser={dbUser} />

        </main>
    </section>
);


export default ProfileSection
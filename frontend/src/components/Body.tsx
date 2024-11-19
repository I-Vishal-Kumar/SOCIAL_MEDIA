import { User } from "@auth0/auth0-react";
import ProfileSection from "../pages/profile/profile"
import { supabase } from "../(clients)/suparbaseClient";
import { useEffect, useState } from "react";
import { dbUserType } from "../types/types";
import Suggestions from "./Suggestions";
import { Avatar } from "@mui/material";
import { BiUser, BiUserCircle } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";

const others = [
    {
        image: <BiUser />,
        name: "Profile",
    },
    {
        image: <BiUserCircle />,
        name: "Followers",
    },
    {
        image: <CiSettings />,
        name: "Settings",
    },
];


const Body = ({ user }: { user: User }) => {

    const [dbUser, setDbUser] = useState<dbUserType | null>(null);

    useEffect(() => {
        if (!user) {
            return;
        }

        const fetchUser = async () => {
            try {
                // Fetch user from Supabase using Auth0 ID
                const { data: users, error } = await supabase
                    .from('users')
                    .select('*')
                    .eq('email', user.email);

                if (error) {
                    console.error("Error fetching user from Supabase:", error.message);
                } else if (users && users.length > 0) {
                    setDbUser(users[0]); // Set the logged-in user
                } else {
                    console.warn("No matching user found in Supabase.");
                }
            } catch (error) {
                console.error("Unexpected error fetching user:", error);
            }
        };

        fetchUser();
    }, [user]);

    if (!dbUser) return null;

    return (
        <main className="flex w-[100vw] bg-slate-400 h-[90%]">
            <section className="w-[20%] mr-4  divide-black overflow-y-auto pb-10 md:block hidden  h-full bg-blue-100">
                <ul>
                    {/* my profile */}
                    <li className="flex space-x-2 pl-3 items-center">
                        <div className="size-14 flex justify-center items-center">
                            <Avatar alt={dbUser.username} src={dbUser.avatar || ''} />
                        </div>
                        <h4 className="text-black">{dbUser?.username}</h4>
                    </li>
                </ul>
                <div className="py-4 font-bold pl-3">
                    <h4>Shortcut&apos;s</h4>
                </div>
                <ul>
                    {others?.map((items, idx) => (
                        <li
                            key={`hots-${ idx }`}
                            className="flex space-x-2 pl-2 items-center"
                        >
                            <div className="size-14 text-xl flex justify-center items-center">
                                {items.image}
                            </div>
                            <h4>{items?.name}</h4>
                        </li>
                    ))}
                </ul>
            </section>

            <ProfileSection dbUser={dbUser} user={user} />

            <section className="w-[30%] md:grid hidden grid-rows-10 grid-cols-1  gap-4 p-4 pb-0 h-full bg-slate-400">
                {/* suggestions */}
                <Suggestions user_id={dbUser.id} />

                <div className="shadow-md rounded-md space-y-3 row-span-4 bg-secondary overflow-y-auto p-4">
                    <h4>Online friends.</h4>

                </div>
            </section>
        </main>
    )
}

export default Body
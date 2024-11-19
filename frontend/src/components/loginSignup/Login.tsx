import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../(clients)/suparbaseClient";



const LoginSection: React.FC = () => {
    const { loginWithPopup, user } = useAuth0();
    const [popupMessage, setPopupMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            // Log in the user via Google using Auth0
            await loginWithPopup({
                authorizationParams: {
                    connection: "google-oauth2",
                },
            });

            // Obtain user details from Auth0
            const userDetails = user;

            if (!userDetails) {
                throw new Error("User details are missing.");
            }

            // Sync the user with Supabase
            const { error: supabaseError = null } = await supabase
                .from("users")
                .upsert({
                    email: userDetails.email,
                    username: userDetails.name,
                    avatar: userDetails.picture,
                }, { onConflict: "email" })

            if (supabaseError) {
                console.error("Error syncing user with Supabase:", supabaseError?.message);
                setPopupMessage("Failed to save user data in the database.");
                return;
            }

            setPopupMessage(`Welcome, ${ userDetails.name || "User" }!`);

            // Navigate to the home page or desired route
            setTimeout(() => {
                navigate("/home");
            }, 500);
        } catch (error) {
            console.log("Google Sign-In Error:", error);
            setPopupMessage("Google Sign-In failed. Please try again.");
        }
    };
    return (
        <section className=" bg-slate-50 h-full md:mt-0 mt-20 pl-10 pr-10 pt-20 space-y-6 w-full md:w-1/2">
            <div className="font-bold">
                <h2>Login.</h2>
            </div>
            <div>
                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Sign in with Google
                </button>
            </div>
            {popupMessage && (
                <div className="mt-4 p-2 border border-gray-300 bg-gray-100 rounded text-center">
                    {popupMessage}
                </div>
            )}
        </section>
    );
};

export default LoginSection;

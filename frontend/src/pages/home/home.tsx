import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Body from "../../components/Body";


const Home = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();


    if (isLoading || !user) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated && !isLoading) {
        return (
            <div>
                <p>Please log in to view this page.</p>
                <button type="button" onClick={() => navigate('/')}>Go to Login</button>
            </div>
        );
    }


    return (
        <section className="w-full h-full">
            <Header />
            {/* main content's in home page ..  */}

            <Body user={user} />
        </section>
    );
};

export default Home;




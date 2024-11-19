import { TextField } from "@mui/material";

type ChildComponentProps = {
    updateActive: React.Dispatch<React.SetStateAction<Boolean>>;
};

const SignupSection: React.FC<ChildComponentProps> = ({ updateActive }) => {
    return (
        <section className=" md:mt-0 mt-20 pl-10 pr-10 pt-20  bg-blue-50 md:w-1/2 w-full  h-full space-y-6">
            <div className="font-bold">
                <h2>Register.</h2>
            </div>
            <div className="w-full flex flex-col space-y-7">
                <TextField
                    label="Username"
                    variant="standard"
                    color="primary"
                />
                <TextField
                    type="email"
                    id="standard-basic"
                    label="Gamil"
                    variant="standard"
                    color="primary"
                />
                <TextField
                    type="password"
                    id="standard-basic"
                    label="Password"
                    variant="standard"
                    color="primary"
                />
                <TextField
                    type="text"
                    id="standard-basic"
                    label="Confirm password"
                    variant="standard"
                    color="primary"
                />
            </div>
            <div>
                <button
                    type="button"
                    className="capitalize mt-6 w-36 font-semibold hover:shadow-md shadow-sm py-2 transition-colors ease-linear hover:bg-blue-200 rounded-md bg-primary text-white hover:text-black"
                >
                    Register
                </button>
            </div>
            <div className="text-center md:hidden">
                <p
                    onClick={(e) => updateActive((prev) => !prev)}
                    className="mt-20 hover:text-blue-300 cursor-pointer"
                >
                    Have an account login now.
                </p>
            </div>
        </section>
    );
};

export default SignupSection;

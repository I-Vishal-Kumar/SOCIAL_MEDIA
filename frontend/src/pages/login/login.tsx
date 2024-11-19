import SignupSection from "../../components/loginSignup/Signup";
import LoginSection from "../../components/loginSignup/Login";
import { useState } from "react";

export default function Login() {
    const [isLoginActive, updateLoginActive] = useState<Boolean>(true);
    return (
        <section className="flex h-screen w-screen justify-center bg-purple-400 items-center">
            <div className="md:flex hidden relative w-full md:w-3/4 h-full md:h-4/5 rounded-md bg-blue-50 overflow-hidden">
                <section
                    style={{
                        transition: "all 2s ease-in-out",
                    }}
                    className={`pt-20 absolute top-0 ${ isLoginActive ? " left-0 " : " right-0 "
                        } pr-6 pl-20 bg-blue-100 md:w-1/2 z-[10] hidden md:block h-full space-y-6`}
                >
                    <div className="font-bold">
                        <h1>Hello</h1>
                        <h1>there.</h1>
                    </div>
                    <div>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Soluta minima inventore, molestiae ut eum a
                            facilis pariatur adipisci magni dignissimos.
                        </p>
                    </div>
                    <div>
                        <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                    <div>
                        <button
                            onClick={() => updateLoginActive((prev) => !prev)}
                            type="button"
                            className="capitalize w-36 font-semibold hover:shadow-md shadow-sm py-2 transition-colors ease-linear hover:bg-blue-200 rounded-md bg-white"
                        >
                            {isLoginActive ? "register" : "login"}
                        </button>
                    </div>
                </section>
                <SignupSection updateActive={updateLoginActive} />
                <LoginSection />
            </div>

            <div className="flex md:hidden relative w-full h-full  bg-blue-50 overflow-hidden">
                {isLoginActive ? (
                    <LoginSection />
                ) : (
                    <SignupSection updateActive={updateLoginActive} />
                )}
            </div>
        </section>
    );
}

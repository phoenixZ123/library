import React from "react";
import { useTheme } from "../hooks/useTheme";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSignin } from "../hooks/useSignin";
import reading from "../assets/reading.svg";
import { Link } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  let { error, loading, signIn } = useSignin();
  const login = async (e) => {
    e.preventDefault();
    let user = await signIn(email, password);

    if (user) {
      navigate("/");
    }
  };
  let { isDark } = useTheme();
  return (
    <div className={`${isDark ? "bg-dbg" : "bg-gray-50"} `}>
      <div className="flex  flex-cols  justify-center px-6 py-8  md:h-screen lg:py-0">
        <div className="w-full  rounded-lg shadow-2xl md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-2 md:space-y-2 md:p-3">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-center text-slate-800">
              Sign in to your account
            </h1>
            <p>{error && <p className="text-red-600 italic">{error}</p>}</p>
            <form className="space-y-4 md:space-y-6" onSubmit={login}>
              <div>
                <label
                  className={`${
                    isDark ? "text-white" : ""
                  } block mb-2 text-sm font-medium  `}
                >
                  Your email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border focus:outline-none  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="***123@gmail.com"
                />
              </div>
              <div>
                <label
                  className={`${
                    isDark ? "text-white" : ""
                  } block mb-2 text-sm font-medium  `}
                >
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border focus:outline-none  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start"></div>
                <Link
                  to="/forgot"
                  className={`${
                    isDark ? "text-primary" : ""
                  } block mb-2 text-sm font-medium  hover:underline`}
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className="flex justify-center w-full stroke-green-500 uppercase text-white bg-primary-600 hover:bg-primary-700 active:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-slate-500"
              >
                {loading && (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <div
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></div>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                <p>Sign in</p>
              </button>
              {/* <p className="text-sm ">
                Don’t have an account yet?
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-amber-500"
                >
                  Sign up
                </Link>
              </p> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

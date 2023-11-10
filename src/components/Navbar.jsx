import { NavLink } from "react-router-dom";
import userLogin from "../assets/user.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useTheme } from "../hooks/useTheme";
import lightMode from "../assets/light.svg";
import darkMode from "../assets/dark.svg";
import { useSignout } from "../hooks/useSignout";
import { AuthContext } from "../Contexts/AuthContext";
import { Login } from "../pages/Login";

export const Navbar = () => {
  const [search, setSearch] = useState("");
  let navigate = useNavigate();

  const handleSearch = () => {
    console.log(search);
    navigate("/?search=" + search);
    setSearch("");
  };

  let { logOut } = useSignout();
  const signOutUser = async () => {
    await logOut();
    navigate("/login");
  };
  // auth con
  const { user } = useContext(AuthContext);

  let { changeTheme, isDark } = useTheme();

  
  return (
    <nav
      className={` ${
        isDark ? "bg-dbg" : "bg-white"
      }  sm:max-w-3xl md:max-w-full  `}
    >
      <div className="container  mx-auto flex items-center justify-between gap-3">
        {/* first show */}
        <div className="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
          </svg>
          <div className="text-primary font-bold text-lg hidden md:block">
            Book Store
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* search input btn */}
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 m-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="bg-white text-sm outline-none hover:animate-pulse text-black bg-transparent p-1 rounded-md"
              type="text"
              placeholder="Search books title"
            />
            <button
              onClick={handleSearch}
              className="active:bg-indigo-400 flex justify-center items-center text-[12px] bg-primary rounded-full ml-1"
            >
              <div className="p-1">Search</div>
            </button>
          </div>
          {/* right  */}
          <div className="flex items-center">
            <button className="mr-3">
              <NavLink to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </NavLink>
            </button>
            <button className="mr-10 bg-primary px-2 py-2 rounded-xl h-6 text-white w-18 text-[12px] flex justify-center items-center">
              <NavLink to="/create">
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  <span className="md:block hidden">Create Book</span>
                </div>
              </NavLink>
            </button>
            <div>
              <img src={userLogin} className="w-8 h-8" alt="" />
            </div>
            <div className="flex mx-1">
              {isDark && (
                <img
                  src={lightMode}
                  alt=""
                  className="w-5 cursor-pointer"
                  onClick={() => changeTheme("light")}
                />
              )}
              {!isDark && (
                <img
                  src={darkMode}
                  alt=""
                  className="w-5 cursor-pointer"
                  onClick={() => changeTheme("dark")}
                />
              )}
              <div>
                {!user && (
                  <>
                    <Link
                      to={`/login`}
                      className="inline-block border-2 border-green-400 rounded-lg text-green-900  px-2 pb-2 pt-2 mx-2 text-xs font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                    >
                      Log In
                    </Link>
                    <Link
                      to={`/register`}
                      className="inline-block border-2 border-red-400 font-bold rounded-lg text-amber-900  px-2 pb-2 pt-2 mx-2 text-xs uppercase leading-normal shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
              {/* log out */}
              {!!user && (
                <>
                  <button
                    type="button"
                    onClick={signOutUser}
                    className="inline-block rounded-lg border-2 border-red-500 text-red-200 px-2  bg-red-700 py-1 mx-2 text-sm font-medium uppercase shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                  >
                    Log Out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

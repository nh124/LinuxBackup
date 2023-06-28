import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";
import React from "react";

const OAuth = ({ darkMode, setPopUpActive }) => {
  return (
    <div
      className={`w-[60%] h-auto flex flex-col px-3 py-3 max-md:w-full ${
        darkMode ? "text-[#54BEB8]" : ""
      }`}
    >
      <h2 className={`text-2xl font-Inter font-extrabold py-3 px-3`}>Login</h2>
      <div className="flex flex-row gap-3 px-3 py-3 w-full max-lg:flex-col">
        <div className="w-full border rounded-md px-1 py-3 flex flex-row justify-center items-center gap-3 cursor-pointer hover:bg-slate-300 duration-200 hover:text-black" onClick={() => setPopUpActive(true)}>
          <div>
            <FcGoogle size={30} />
          </div>
          <div>
            <span>Sign up with Google</span>
          </div>
        </div>
        <div className="w-full border rounded-md px-1 py-3 flex flex-row justify-center items-center gap-3 cursor-pointer hover:bg-slate-300 duration-200 hover:text-black" onClick={() => setPopUpActive(true)}>
          <div>
            <RxGithubLogo size={30} />
          </div>
          <div>
            <span>Sign up with Github</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OAuth;

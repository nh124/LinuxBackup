import { React, useEffect } from "react";

const Loading = ({ connect, userData, darkMode }) => {
  return (
    <div
      className={`flex flex-col w-full h-screen justify-center items-center shadow-lg ${
        darkMode ? "bg-[#282b30]" : "bg-white"
      }`}
    >
      <div className="w-[50%] h-[80%] flex flex-col justify-center items-center px-3  max-sm:w-[80%]">
        <div
          className={`w-[60%] h-[60%] shadow-lg flex flex-col justify-center  max-xl:w-full max-sm:w-full ${
            darkMode ? "bg-[#36393e]" : "bg-[#f8f8f8]"
          }`}
        >
          <div className="w-full h-[30%] flex flex-row items-center justify-center">
            <div className="w-[50%] h-[100%] flex flex-row justify-start items-center overflow-hidden bg-slate-500 rounded-full relative max-lg:w-[70%]">
              <div className="w-[50%] h-[100%] flex justify-center items-center overflow-hidden rounded-full relative z-10">
                <img
                  className="object-cover w-[100%] translate-y-12 flex"
                  src="https://e0.pxfuel.com/wallpapers/813/947/desktop-wallpaper-gohan-teen-ssj-dbz-thumbnail.jpg"
                  alt=""
                />
              </div>
              <div
                className={`w-[70%] h-[100%] flex flex-col justify-center items-end px-3 shadow-xl ${
                  darkMode ? "bg-gray-800" : "bg-slate-500"
                }  absolute right-0`}
              >
                <div className="w-[70%]">
                  <h1 className="font-bold text-xl text-[#dc143c] max-xl:text-sm max-sm:text-sm">
                    Welcome
                  </h1>
                  <h1 className="font-bold text-lg text-white max-xl:text-sm max-sm:text-sm">
                    {userData.name}
                  </h1>
                  <h1 className="italic text-xs text-white max-xl:text-xsm max-sm:text-xs">
                    @{userData.username}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center "></div>
          <div className="h-[20%] flex justify-center items-center">
            <button
              className={`${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-900"
                  : "bg-blue-00 hover:bg-blue-500"
              } w-[40%] h-[40%] rounded-md hover:text-white duration-300 text-slate-300 font-bold`}
              onClick={() => {
                connect();
              }}
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;

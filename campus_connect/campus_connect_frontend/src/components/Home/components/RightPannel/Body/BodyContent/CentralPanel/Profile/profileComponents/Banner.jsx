import React from "react";

const Banner = ({ darkMode }) => {
  return (
    <div
      className={`w-full h-[370px] min-h-[370px] ${
        darkMode ? "bg-gray-800" : "bg-[#dddfe6]"
      } flex flex-col relative rounded-lg overflow-hidden`}
    >
      <div className="w-full h-[100%] bg-blue-400 flex justify-center items-center overflow-hidden">
        <img
          src="https://media.licdn.com/dms/image/C4E16AQGcoNyYb-E0tQ/profile-displaybackgroundimage-shrink_350_1400/0/1608493956610?e=1692230400&v=beta&t=rL8peFci-1qC_tmo03_8mhLeSkqXHS47ncgBi8_xCAc"
          alt=""
        />
      </div>
      <div className="w-full h-[100%] flex flex-row">
        <div className="w-full h-[100%] flex flex-col justify-end items-start px-3 py-3">
          <span className="mr-9 text-xl font-bold">Nur Haque</span>
          <span className="mr-9 text-base">Product Engineer at Belcan</span>
          <span
            className={`mr-9 text-xs ${
              darkMode ? "text-[#969699]" : "text-gray-700"
            }`}
          >
            Atlanta, Georgia, United States Contact info
          </span>
        </div>
        <div className="w-full h-[100%] flex flex-col justify-between items-end px-3 py-3 text-lg font-bold">
          <div className="flex flex-row items-center gap-3">
            <img
              className="w-[40px]"
              src="https://www.gsu.edu/wp-content/uploads/2019/11/logo-3.png"
              alt=""
            />
            <span>Georgia State University</span>
          </div>

          <div className="w-[150px] h-[50px] flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
            <span>TEACHER</span>
          </div>
        </div>
      </div>
      <div className="w-[200px] h-[200px] bg-black rounded-full absolute top-[60px] left-7 flex justify-center items-center overflow-hidden border-4 border-white">
        <img
          src="https://i.pinimg.com/originals/57/b7/f9/57b7f9f27e7505dc2d0beab162069dcf.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Banner;

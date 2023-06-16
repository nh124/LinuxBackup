import React from "react";

const Banner = () => {
  return (
    <div className="h-[209px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-row px-8 py-8">
      <div className="w-[50%] flex flex-wrap justify-start items-start gap-3 max-sm:w-full max-xl:w-[90%] max-lg:w-[100%]">
        <h2 className="text-white font-bold text-xl">Welcome Back</h2>
        <span className="text-white ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
          odit dolorem labore? Facilis illo nihi
        </span>
        <button className="text-white bg-[#C86DFF] w-[137px] h-[40px] rounded hover:bg-[#bf59ff]">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Banner;

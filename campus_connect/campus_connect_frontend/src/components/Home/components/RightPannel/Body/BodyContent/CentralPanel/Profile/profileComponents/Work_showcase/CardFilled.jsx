import React from "react";
import { BsGithub } from "react-icons/bs";
import { RxExternalLink } from "react-icons/rx";

const CardFilled = () => {
  return (
    <div className="w-full h-[100%] bg-slate-600 flex overflow-hidden relative shadow-xl rounded-lg">
      <div className="w-full h-[100%] overflow-hidden flex justify-start">
        <img
          className="object-cover w-[100%] h-[100%]"
          src="https://images.squarespace-cdn.com/content/v1/613e5ca8e3da643aaefa7c86/1631486788170-3IHMICUBFCMWNCIVSL18/blog-7.png"
          alt=""
        />
      </div>
      <div className="absolute bottom-0 right-0 w-full h-[20%] bg-black/50 flex justify-between items-center text-white px-3">
        <div className="hover:underline hover:cursor-pointer">
          <span>Learn More</span>
        </div>
        <div className="w-auto h-[100%] flex flex-row gap-3 items-center">
          <div className="hover:cursor-pointer">
            <BsGithub size={20} />
          </div>
          <div className="hover:cursor-pointer">
            <RxExternalLink size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardFilled;

import React from "react";

const Listitem = ({ name, profile, restaurant, navigation, chat }) => {
  return (
    <div className="w-full h-[49px] flex flex-row mt-2 hover:cursor-pointer">
      <div className="w-[2%] h-[49px] bg-green-600"></div>

      {name == "Profile" && (
        <>
          <div className="w-[98%] h-[49px] bg-white flex justify-start items-center px-3 gap-2 relative group">
            {name == "Profile" && (
              <div className="relative z-10">{profile}</div>
            )}
            <div className="relative z-10">{name}</div>
            <div className="absolute w-0 h-[49px] bg-green-300 left-0 group-hover:w-[98%] duration-300"></div>
          </div>
        </>
      )}
      {name == "Restaurants" && (
        <>
          <div
            className="w-[98%] h-[49px] bg-white flex justify-start items-center px-3 gap-2 relative group"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/restaurant";
            }}
          >
            {name == "Restaurants" && (
              <div className="relative z-10">{restaurant}</div>
            )}
            <div className="relative z-10">{name}</div>
            <div className="absolute w-0 h-[49px] bg-green-300 left-0 group-hover:w-[98%] duration-300"></div>
          </div>
        </>
      )}

      {name == "Navigation" && (
        <>
          <div className="w-[98%] h-[49px] bg-white flex justify-start items-center px-3 gap-2 relative group">
            {name == "Navigation" && (
              <div className="relative z-10">{navigation}</div>
            )}
            <div className="relative z-10">{name}</div>
            <div className="absolute w-0 h-[49px] bg-green-300 left-0 group-hover:w-[98%] duration-300"></div>
          </div>
        </>
      )}
      {name == "Chat" && (
        <>
          <div
            className="w-[98%] h-[49px] bg-white flex justify-start items-center px-3 gap-2 relative group"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/chat";
            }}
          >
            {name == "Chat" && <div className="relative z-10">{chat}</div>}
            <div className="relative z-10">{name}</div>
            <div className="absolute w-0 h-[49px] bg-green-300 left-0 group-hover:w-[98%] duration-300"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Listitem;

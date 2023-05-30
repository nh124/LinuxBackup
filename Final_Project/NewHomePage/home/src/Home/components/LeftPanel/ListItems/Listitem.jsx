import React from "react";

const Listitem = ({ name, profile, restaurant, navigation, chat }) => {
  return (
    <div className="w-full h-[49px] flex flex-row mt-2 hover:cursor-pointer">
      <div className="w-[2%] h-[49px] bg-green-600"></div>

      <div className="w-[98%] h-[49px] bg-white flex justify-start items-center px-3 hover:bg-green-300 gap-2">
        {name == "Profile" && <div>{profile}</div>}
        {name == "Restaurants" && <div>{restaurant}</div>}
        {name == "Navigation" && <div>{navigation}</div>}
        {name == "Chat" && <div>{chat}</div>}
        <div>{name}</div>
      </div>
    </div>
  );
};

export default Listitem;

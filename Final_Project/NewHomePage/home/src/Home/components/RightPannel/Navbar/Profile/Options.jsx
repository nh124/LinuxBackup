import React from "react";

const Options = ({ status }) => {
  return (
    <div
      className={`bg-[#F5F6F9] w-[100px] h-auto flex flex-col items-end top-0 right-4 absolute`}
      style={{ display: status ? "flex" : "none" }}
    >
      {console.log(status)}
      <span className="py-1 hover:bg-[#c9c9ca] w-full px-3 hover:cursor-pointer">
        Night
      </span>
      <span className="py-1 hover:bg-[#c9c9ca] w-full px-3 hover:cursor-pointer">
        Logout
      </span>
    </div>
  );
};

export default Options;

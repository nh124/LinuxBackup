import React from "react";

const Options = ({ status }) => {
  return (
    <div
      className={`bg-white w-[220px] h-auto flex flex-col items-end top-0 right-0 absolute rounded-br-lg rounded-bl-lg border`}
      style={{ display: status ? "flex" : "none" }}
    >
      <span className="py-1 hover:bg-[#c9c9ca] w-full px-3 hover:cursor-pointer border-b">
        Night
      </span>
      <span
        className="py-1 hover:bg-[#c9c9ca] w-full px-3 hover:cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = "/login";
        }}
      >
        Logout
      </span>
    </div>
  );
};

export default Options;

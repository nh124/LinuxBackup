import React from "react";

const Overlay = ({ PopupActive }) => {
  return (
    <div
      className={`${
        PopupActive ? "flex" : "hidden"
      } w-full h-screen bg-black/50 absolute top-0 right-0 z-20`}
    ></div>
  );
};

export default Overlay;

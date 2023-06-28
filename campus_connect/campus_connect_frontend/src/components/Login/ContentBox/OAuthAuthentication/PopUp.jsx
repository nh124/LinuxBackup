import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

const PopUp = ({ dialogue, icon, PopupActive, setPopUpActive }) => {
  return (
    <div
      className={`${
        PopupActive ? "flex" : "hidden"
      } w-[500px] h-[200px] bg-cyan-600   absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold rounded-lg shadow-xl gap-2 px-3 py-3`}
    >
      <div className="flex rounded-lg shadow-xl gap-2 justify-center items-center w-full h-[100%]  bg-slate-300 relative">
        <div
          className="absolute top-2 right-2 hover:cursor-pointer"
          onClick={() => setPopUpActive(false)}
        >
          <AiFillCloseCircle />
        </div>
        <div className="w-[100px] h-[70px] flex justify-center items-center rounded-xl bg-cyan-500">
          {icon}
        </div>
        <div>
          <span>{dialogue}</span>
        </div>
      </div>
    </div>
  );
};

export default PopUp;

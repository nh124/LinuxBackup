import React from "react";
import { BsPlusCircle } from "react-icons/bs";

const CardEmpty = () => {
  return (
    <div className="w-full h-[100%] bg-slate-300 flex overflow-hidden relative shadow-xl rounded-lg">
      <div className="w-full h-full flex justify-center items-center hover:cursor-pointer hover:shadow-lg">
        <BsPlusCircle size={40} color="gray" />
      </div>
    </div>
  );
};

export default CardEmpty;

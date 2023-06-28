import React from "react";

const StudentCard = ({ name, status, level, darkMode }) => {
  return (
    <div
      className={`flex flex-row gap-3 ${
        darkMode ? "hover:bg-gray-700" : "hover:bg-slate-200 "
      } px-3 py-2 hover:cursor-pointer`}
    >
      <img
        className="w-[50px] h-[40px] rounded-3xl"
        src="https://i.pinimg.com/originals/57/b7/f9/57b7f9f27e7505dc2d0beab162069dcf.jpg"
        alt=""
      />
      <div className="w-full flex flex-col">
        <span className="font-bold">{name}</span>
        <span className="text-xs">{level}</span>
      </div>
      <div className="mr-3 text-xs flex items-center">{status}</div>
    </div>
  );
};

export default StudentCard;

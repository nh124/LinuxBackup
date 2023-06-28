import { React, useState } from "react";
import CardFilled from "./CardFilled";
import CardEmpty from "./CardEmpty";

const Work_Showcase = ({ darkMode }) => {
  const [work, setWork] = useState([]);
  return (
    <div
      className={`w-full h-auto min-h-[300px] rounded-lg px-3 py-3 flex flex-col relative overflow-auto ${
        darkMode ? "bg-gray-800" : "bg-slate-200 "
      }`}
    >
      <div className="w-full min-h-[10%] h-auto py-3 px-3 flex items-center justify-start text-xl">
        <span className="font-bold">My Projects</span>
      </div>
      <div className="flex flex-row gap-3 items-center h-[100%] px-3 py-3">
        {work.length > 0 ? <CardFilled /> : <CardEmpty />}
        {work.length > 0 ? <CardFilled /> : <CardEmpty />}
        {work.length > 0 ? <CardFilled /> : <CardEmpty />}
      </div>
    </div>
  );
};

export default Work_Showcase;

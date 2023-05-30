import React, { useState } from "react";
import { Students } from "./stdInfo";
import StudentCard from "./StudentCard";

const ListOfStd = () => {
  const [hidden, setHidden] = useState(true);
  return (
    <div className="flex flex-col gap-2 mt-3">
      <h2>Students</h2>
      <div
        className={`flex flex-col gap-2 bg-white max-h-[650px] ${
          hidden ? "overflow-hidden" : "overflow-auto"
        } ${hidden ? "h-[248px]" : "h-auto"}`}
      >
        {Students.map((std, idx) => (
          <StudentCard name={std.name} level={std.level} status={std.status} />
        ))}
      </div>
      <button
        className="bg-[#6A68FF] text-white h-[40px] hover:bg-[#8583ff]"
        onClick={() => setHidden(!hidden)}
      >
        {hidden ? "View More" : "View Less"}
      </button>
    </div>
  );
};

export default ListOfStd;

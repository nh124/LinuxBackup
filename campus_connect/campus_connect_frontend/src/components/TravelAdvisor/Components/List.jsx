import React from "react";
import Card from "./Card";

const List = () => {
  return (
    <div className="w-[30%] h-full bg-slate-100 py-3 px-1 overflow-auto flex flex-col gap-3">
      <select name="" id="" className="w-[30%] h-[3%]">
        <option value="Select">Select....</option>
        <option value="Restaurant">Restaurant</option>
        <option value="Restaurant">Restaurant</option>
        <option value="Restaurant">Restaurant</option>
      </select>
      <Card />
    </div>
  );
};

export default List;

import React from "react";

const Status = () => {
  return (
    <div className="h-[81px] flex flex-row justify-between items-center bg-white mt-3">
      <div className="w-full h-[81px] flex items-center border">
        <div className="flex flex-col px-3">
          <span className="text-[10px]">Students</span>
          <span className="text-[#76E699] text-2xl ml-4">359</span>
        </div>
      </div>
      <div className="w-full h-[81px] flex items-center border">
        <div className="flex flex-col px-3">
          <span className="text-[10px]">Students</span>
          <span className="text-[#F2699F] text-2xl ml-4">359</span>
        </div>
      </div>
      <div className="w-full h-[81px] flex items-center">
        <div className="flex flex-col px-3">
          <span className="text-[10px]">Students</span>
          <span className="text-[#F5A623] text-2xl ml-4">359</span>
        </div>
      </div>
    </div>
  );
};

export default Status;

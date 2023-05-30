import React from "react";

const Navbar = () => {
  return (
    <div className="w-full h-[70px] bg-white/50 flex flex-row justify-between items-center px-4 absolute">
      <div>Logo</div>
      <ul className="flex flex-row gap-6 hover:cursor-pointer">
        <li className=" hover:border hover:border-b-blue-400">Home</li>
        <li>Home</li>
        <li>Home</li>
        <li>Home</li>
      </ul>
    </div>
  );
};

export default Navbar;

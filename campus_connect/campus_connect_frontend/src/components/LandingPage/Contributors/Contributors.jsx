import React from "react";
import { contributors } from "./ContributorsList";
const Contributors = ({ darkMode }) => {
  return (
    <div
      name="Contributors"
      className={`w-full h-screen flex flex-row justify-center items-center ${
        darkMode ? "bg-[#36393e]" : "bg-white"
      }`}
    >
      <div className="w-[70%] h-[60%] flex flex-col justify-center items-center gap-2 max-md:h-[80%]">
        <span className="text-[#dc143c] text-7xl font-montserrat uppercase max-md:text-5xl max-sm:text-4xl">
          Contributors
        </span>
        <br />
        <br />
        <br />
        <div
          className={`w-[90%] h-[70%] flex flex-row justify-center items-center gap-2 ${
            darkMode ? "text-white" : ""
          } max-md:flex-col`}
        >
          {contributors.map((contributor, index) => (
            <div
              key={index}
              className={`w-full h-[30%] rounded-md shadow-sm hover:shadow-lg duration-300 flex flex-row justify-start items-center border px-3 py-3 ${
                darkMode ? "bg-[#282a2e] border-gray-600 hover:shadow-xl" : ""
              }`}
            >
              <img
                className="w-[40%]"
                src="https://img.icons8.com/bubbles/100/000000/new-post.png"
                alt=""
              />
              <div className="flex flex-col">
                <p>Nur Haque</p>
                <p className="text-xs">nur.haque99@gmail.com</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contributors;

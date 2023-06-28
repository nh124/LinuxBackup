import { React, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
const About = ({ darkMode, showEditAbout, setShowEditAbout }) => {
  const [about, setAbout] = useState("");
  const [liveText, setLiveText] = useState("");

  return (
    <div
      className={`w-full h-auto rounded-lg px-3 py-3 flex flex-col max-h-[200px] relative ${
        darkMode ? "bg-gray-800" : "bg-slate-200 "
      }`}
    >
      <div className="w-full flex flex-col relative">
        <div className="flex flex-row justify-between w-full text-xl items-center">
          <span className="font-bold px-3 py-3">About Me</span>
          <div
            className="hover:underline hover:cursor-pointer"
            onClick={() => setShowEditAbout(true)}
          >
            {darkMode ? (
              <AiOutlineEdit color="white" size={25} />
            ) : (
              <AiOutlineEdit color="blue" size={25} />
            )}
          </div>
        </div>
        <div className="px-3 py-3">
          <span>{about}</span>
        </div>
      </div>

      <div
        className={`w-[80%] h-auto  absolute right-[50%] top-[-50%] transform translate-x-[50%] rounded-lg shadow-lg flex-col z-20 ${
          darkMode ? "bg-gray-800" : "bg-white"
        } ${showEditAbout ? "flex" : "hidden"}`}
      >
        <div
          className={`w-full  px-3 py-3 border-b flex flex-row justify-between items-center ${
            darkMode ? "border-gray-600" : ""
          }`}
        >
          <span className="text-xl w-full">
            Tell us a little about yourself
          </span>
          <div
            className="hover:cursor-pointer"
            onClick={() => setShowEditAbout(false)}
          >
            <IoMdClose size={30} />
          </div>
        </div>

        <span className="text-xs w-full px-3 py-3">
          You can write about your years of experience, industry, or skills.
          People also talk about their achievements or previous job experiences.
        </span>

        <div className={`px-3 py-3 flex items-end flex-col gap-3 h-[200px]`}>
          <textarea
            name=""
            id=""
            cols="10"
            rows="10"
            maxlength="600"
            className={`border w-full px-3 py-3 resize-none ${
              darkMode
                ? "bg-gray-900 border-none rounded-lg focus:border-gray-600"
                : "bg-white"
            }`}
            onChange={(e) => setLiveText(e.target.value)}
          ></textarea>
          <button
            className="w-[50px] h-[30px] px-3 py-1 flex justify-center items-center rounded-xl text-white bg-blue-700"
            onClick={() => {
              setShowEditAbout(false);
              setAbout(liveText);
            }}
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;

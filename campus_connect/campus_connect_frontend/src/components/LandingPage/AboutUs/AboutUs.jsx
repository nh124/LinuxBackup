import React from "react";

const AboutUs = ({ darkMode }) => {
  return (
    <div
      name="About"
      className={`w-full h-[70vh] flex justify-center items-center ${
        darkMode ? "bg-[#0a192f]" : "bg-blue-400"
      } px-3`}
    >
      <div className="w-full h-[60%] flex flex-col items-center justify-center gap-3">
        <div className="flex flex-col items-center">
          <div className="flex flex-row gap-3 text-7xl max-md:text-5xl">
            <span
              className={` font-montserrat uppercase ${
                darkMode ? "text-white" : ""
              }`}
            >
              About
            </span>
            <span className=" font-montserrat text-[#dc143c] uppercase">
              Us
            </span>
          </div>
          <p className={`italic ${darkMode ? "text-white" : ""}`}>
            Make the most out of your campus!
          </p>
        </div>
        <br />
        <div className="h-[40%] flex justify-center">
          <span className="flex justify-center items-center text-xl font-bold text-white w-[70%] text-center max-md:text-base max-sm:w-[90%] max-sm:mt-4">
            Campus Connect is a hub where students can interact with their
            Campus! It allows people to view nearby restaurants, chat with peers
            in their major, and share their profile with fellow students. Campus
            Connect allows students, new and old, to better connect with their
            classmates and find a good lunch within walking distance of their
            classes!
          </span>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

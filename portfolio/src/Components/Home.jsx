import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-scroll";

const Home = () => {
  return (
    <div name="home" className="w-full h-screen bg-[#0a192f]">
      {/* container */}
      <div className="max-w-[1000px] mx-auto px-8 flex flex-col justify-center h-full">
        <p className="text-pink-600">Hi, my name is</p>
        <h2 className="text-4xl sm:text-7xl font-bold text-[#ccd6f6]">
          Nur Haque
        </h2>
        <h2 className="text-4xl sm:text-7xl font-bold text-[#8892b0]">
          <TypeAnimation
            sequence={[
              2000,
              "I'm a Full-Stack Developer.", // Types 'One'
              2000, // Waits 1s
              "I'm a Problem Solver.", // Deletes 'One' and types 'Two'
              2000, // Waits 2s
              "I'm a Collaborator.",
              200,
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
          />
        </h2>
        <p className="text-[#8892b0] py-4 max-w-[700px]">I'm a full</p>
        <div>
          <button className="text-white group border-2 px-6 py-3 flex items-center hover:bg-pink-600 hover:border-pink-600">
            <Link to="about" smooth={true} duration={500}>
              Learn More About Me!
            </Link>
            <span className="group-hover:rotate-90 duration-300">
              <HiArrowNarrowRight className="ml-2" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

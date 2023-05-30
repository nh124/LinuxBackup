import React from "react";
import Nur from "../Assets/Nur.jpg";

const About = () => {
  return (
    <div
      name="about"
      className="w-full h-screen bg-[#0a192f] text-gray-300 px-5"
    >
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="max-w-[1000px] w-full px-4 grid grid-cols-2 gap-8">
          <div className="sm:text-right">
            <p className="text-4xl text-bold inline border-b-4 border-pink-600">
              About
            </p>
          </div>
          <div></div>
        </div>
        <div className="max-w-[1000px] w-full grid sm:grid-cols-2 gap-8 py-6 px-6">
          <div className="shadow-lg shadow-[#040c16] bg-[#122c54]">
            <img src={Nur} alt="Portfolio Photo" className="px-2 py-2" />
          </div>
          <div className="shadow-lg shadow-[#040c16] px-6 py-4">
            <p>
              Hi! My name is Nur Haque, and I have a very big passion for
              creating software. My interest is in web development, and the
              greatest inspiration that set me on this path was the first
              Javascript game I built.
            </p>
            <br />
            <p>
              Later down the line I worked on countless fascinating projects
              which sharpened my skills and allowed me to work for software
              companies such as Konsole Kings and designed for greatness as an
              intern.
            </p>
            <br />
            <p>
              As of 2023, I had the great pleasure of working for Belcan as a
              product engineer as a May 2023 GSU graduate. I Have lots of
              inspiring mentors and colleague that has pushed me to complete my
              best work for my clients, and I hope I could do the same moving
              forward.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

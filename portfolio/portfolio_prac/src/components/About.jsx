import React from "react";

const About = () => {
  return (
    <div name="About" className="w-full h-screen bg-[#0a192f] text-gray-300">
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="max-w-[1000px] w-full px-4 grid grid-cols-2 gap-8">
          <div className="sm:text-right">
            <p className="text-4xl text-bold inline border-b-4 border-pink-600">
              About
            </p>
          </div>
          <div></div>
        </div>
        <div className="max-w-[1000px] w-full grid sm:grid-cols-2 gap-8 py-6">
          <div className="sm:text-right text-4xl font-bold">
            <p>
              Hi, I'm Nur Haque, nice to meet you. Please take a look around.
            </p>
          </div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam
            explicabo a necessitatibus repellat nulla, aliquid corrupti officiis
            illo id numquam sint non consectetur dolorem in! Placeat nesciunt
            asperiores dolorum doloremque.
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

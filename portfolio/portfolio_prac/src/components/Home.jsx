// rafce
import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";

const Home = () => {
  return (
    <div name="home" className="w-full h-screen bg-[#0a192f]">
      <div className="max-w-[1000px] mx-auto px-8 flex flex-col justify-center h-full">
        <p className="text-pink-600">Hi, my name is</p>
        <h2 className="text-4xl sm:text-7xl font-bold text-[#ccd6f6]">
          Nur Haque
        </h2>
        <h2 className="text-4xl sm:text-7xl font-bold text-[#8892b0]">
          Full-Stack developer
        </h2>
        <p className="text-[#8892b0] py-4 max-w-[700px]">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae
          reprehenderit omnis magnam perferendis eius ut necessitatibus quos
          architecto odio voluptas unde nam corporis, veniam vero doloribus
          esse, vel similique quia?
          <div className="py-4">
            <button className="text-white px-6 py-3 border-2 flex items-center hover:bg-pink-600 hover:border-pink-600 group">
              View Work
              <div className="group-hover:rotate-90 duration-300">
                <HiArrowNarrowRight className="ml-2" />
              </div>
            </button>
          </div>
        </p>
      </div>
    </div>
  );
};

export default Home;

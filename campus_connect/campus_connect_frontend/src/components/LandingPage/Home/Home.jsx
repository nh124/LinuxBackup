import React from "react";

const Home = () => {
  return (
    <div
      name="Home"
      className="w-full h-screen flex flex-col justify-center items-center relative z-0 text-7xl max-md:text-5xl"
    >
      <img
        className="w-full h-full object-cover"
        src="https://cdn.vox-cdn.com/thumbor/x9EhCb6yRPu3n9PgHVh5b89x8bw=/0x0:4500x2520/1200x0/filters:focal(0x0:4500x2520):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/16022530/05_CR_GSU_Sports_Arena_new.jpg"
        alt=""
      />

      <div className="w-full h-screen bg-gradient-to-r from-slate-800/90 to-pink-500/70 absolute flex flex-col justify-center items-center">
        <div className="w-[70%] h-[60%] flex flex-col justify-center items-start">
          <span className="text-white font-montserrat">Welcome</span>
          <span className="text-white font-montserrat">to</span>
          <span className="text-[#dc143c]  font-montserrat">
            Campus Connect
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;

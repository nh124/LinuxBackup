import React from "react";
import { BsMap, BsChatLeft } from "react-icons/bs";
import { BiUpArrowCircle } from "react-icons/bi";
import { RiRestaurant2Line } from "react-icons/ri";
import { serviceList } from "./serviceList";
const Services = ({ darkMode }) => {
  const navigate = (location) => {
    window.location.href = location;
  };
  return (
    <>
      <div
        name="Services"
        className={`w-full h-[30vh] ${
          darkMode ? "bg-[#0a192f]" : "bg-blue-400"
        } absolute z-0`}
      ></div>
      <div className="w-full h-screen flex justify-center items-center z-10 relative">
        <div
          className={`w-full h-[70%] absolute ${
            darkMode ? "bg-[#36393e]" : "bg-white"
          } top-[30%]`}
        ></div>
        <div className="flex flex-row w-[70%] h-screen justify-center items-center max-2xl:w-[90%]  max-xl:w-[90%] max-lg:w-[90%]">
          <div className="w-full h-[70%] flex flex-row items-center shadow-lg rounded-lg bg-transparent max-md:flex-col max-md:gap-4">
            {/* Service Cards */}
            {serviceList.map((Services, index) => (
              <div
                key={index}
                className={`h-[100%] w-full flex flex-col items-center ${
                  index == 0 ? "rounded-tl-2xl rounded-bl-2xl" : ""
                } ${
                  index == 2 ? "rounded-tr-2xl rounded-br-2xl" : ""
                } overflow-hidden relative max-md:rounded-md max-md:w-[70%] max-sm:w-[90%]`}
              >
                <div className="w-full h-[100%] bg-white flex flex-row justify-center items-center">
                  <div className="flex justify-center items-center w-full h-[100%] relative">
                    <div className="flex flex-row justify-center items-center gap-3 relative z-10 bg-black/70 w-full h-[100%]">
                      <div>
                        {Services.name == "Campus Navigation" && (
                          <BsMap size={40} color="white" />
                        )}
                        {Services.name == "Campus Chat" && (
                          <BsChatLeft size={40} color="white" />
                        )}
                        {Services.name == "Campus Restaurant" && (
                          <RiRestaurant2Line size={40} color="white" />
                        )}
                      </div>
                      <div className="text-3xl max-xl:text-2xl max-lg:text-xl max-md:text-lg">
                        <span className="font-montserrat uppercase text-white">
                          {/* Navig */}
                          {Services.name.split(" ")[0]}
                        </span>
                        <span className="font-montserrat text-[#dc143c] uppercase">
                          {Services.name.split(" ")[1]}
                        </span>
                      </div>
                    </div>
                    <img
                      className="absolute top-0 left-0 w-full h-[100%]"
                      src={Services.ImageUrl}
                      alt=""
                    />
                  </div>
                </div>
                <div className="w-full h-[30%] hidden justify-center items-center bg-black/90 overflow-hidden hover:absolute hover:bottom-0 hover:h-[100%] hover:bg-black/80 hover:z-20  hover:rounded-tl-[0px] hover:rounded-tr-[0px] duration-100 max-md:flex">
                  <button className="w-full h-[100%] flex justify-center items-center group flex-col gap-3 px-3">
                    <BiUpArrowCircle
                      size={30}
                      color="white"
                      className="animate-bounce group-hover:hidden"
                    />
                    <button
                      className="hidden group-hover:flex w-auto h-[10%] justify-center items-center border border-[#dc143c] relative group max-md:h-[20%]"
                      onClick={() => navigate(Services.linkToService)}
                    >
                      <div className="w-[10%] h-[100%] absolute top-0 left-0 bg-[#dc143c]"></div>
                      <div className="ml-5 px-3 text-xl">
                        <span className="font-montserrat uppercase text-white">
                          {Services.name.split(" ")[0]}
                        </span>
                        <span className="font-montserrat text-[#dc143c] uppercase">
                          {Services.name.split(" ")[1]}
                        </span>
                      </div>
                    </button>
                    <span className="hidden group-hover:flex text-white max-md:text-xs">
                      {Services.subDescribe}
                    </span>
                  </button>
                </div>
                <div
                  className={`w-full h-[100%] ${
                    index == 0 ? "bg-slate-500 " : ""
                  } ${index == 1 ? "bg-green-600 " : ""} ${
                    index == 2 ? "bg-gray-800 " : ""
                  }flex flex-col justify-center items-center text-white max-md:hidden`}
                >
                  <div className="w-full h-[100%] my-3 px-3 flex justify-center items-center">
                    {Services.describe}
                  </div>
                  <div className="w-full h-[20%] flex justify-center items-center bg-black/50 overflow-hidden hover:absolute hover:bottom-0 hover:h-[100%] hover:bg-black/80 hover:z-20  hover:rounded-tl-[0px] hover:rounded-tr-[0px] duration-100">
                    <button className="w-full h-[100%] flex justify-center items-center group flex-col gap-3 px-3">
                      <BiUpArrowCircle
                        size={30}
                        className="animate-bounce group-hover:hidden"
                      />
                      <button
                        className="hidden group-hover:flex w-auto h-[10%] justify-center items-center border border-[#dc143c] relative group"
                        onClick={() => navigate(Services.linkToService)}
                      >
                        <div className="w-[10%] h-[100%] absolute top-0 left-0 bg-[#dc143c]"></div>
                        <div className="ml-5 px-3">
                          <span className="text-xl font-montserrat uppercase text-white">
                            {Services.name.split(" ")[0]}
                          </span>
                          <span className="text-xl font-montserrat text-[#dc143c] uppercase">
                            {Services.name.split(" ")[1]}
                          </span>
                        </div>
                      </button>
                      <span className="hidden group-hover:flex">
                        {Services.subDescribe}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;

import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-scroll";
import { BsPersonFill, BsFillMoonFill } from "react-icons/bs";
import { BiSun } from "react-icons/bi";
import { MdOutlineSort } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

const Navbar = ({ setDarkMode, darkMode }) => {
  const [dropDown, setDropDown] = useState(false);
  const [showSidePanel, setShowSidePanel] = useState(false);
  let auth_token;
  useEffect(() => {
    auth_token = localStorage.getItem("auth_token");
  }, []);
  const [subMany, setSubMany] = useState(false);
  localStorage.setItem("darkMode", darkMode);
  return (
    <div className="fixed w-full h-[70px] bg-black/30 flex flex-row justify-between items-center px-4 z-20">
      <div className="group hover:cursor-pointer">
        <Link to="Home" smooth={true} duration={700}>
          <div className="text-white text-2xl uppercase flex flex-row gap-2">
            <div>
              <span className="text-[#dc143c]">C</span>ampus
            </div>
            <div>
              <span className="text-[#dc143c]">C</span>onnect
            </div>
          </div>
        </Link>
        <div className="w-0 h-[3px] bg-[#dc143c] group-hover:w-[100%] duration-300"></div>
      </div>
      {!showSidePanel && (
        <div className="hidden max-md:flex hover:cursor-pointer flex-row w-[100px]">
          <div
            className="group w-[50%] flex justify-center items-center"
            onClick={() => setDarkMode(!darkMode)}
          >
            <li className="text-slate-400 hover:text-white duration-300 flex justify-center">
              {darkMode ? <BiSun size={30} /> : <BsFillMoonFill size={20} />}
            </li>
          </div>
          <div onClick={() => setShowSidePanel(true)}>
            <MdOutlineSort size={30} color="white" />
          </div>
        </div>
      )}
      {showSidePanel && (
        <div className="absolute top-0 right-0 bg-slate-500/70 w-[50%] h-screen px-3 py-3 flex flex-col justify-center items-center gap-4 max-md:w-[70%]">
          <div
            className="absolute top-4 right-4 hover:cursor-pointer"
            onClick={() => setShowSidePanel(false)}
          >
            <RxCross1 size={30} color="white" />
          </div>
          <div className="flex flex-col justify-center items-center gap-2 relative">
            <div
              className="text-slate-400 hover:text-white duration-300 flex flex-row justify-center items-center gap-2 w-[300px]"
              onClick={() => setSubMany(!subMany)}
            >
              <div className="w-[30%] h-[80px] rounded-full bg-slate-500 flex overflow-hidden">
                <div className="overflow-hidden w-full h-[100%] flex justify-center items-end">
                  {console.log(auth_token)}
                  {auth_token == null ? (
                    <BsPersonFill size={60} />
                  ) : (
                    <img
                      src="https://i.pinimg.com/originals/57/b7/f9/57b7f9f27e7505dc2d0beab162069dcf.jpg"
                      alt=""
                    />
                  )}
                </div>
              </div>
              <IoIosArrowDown />
            </div>
            <div
              className={`w-[200px] h-auto bg-black/30 top-[110px] right-[22%] py-2 rounded-full list-none ${
                subMany ? "absolute" : "hidden"
              }`}
            >
              <li className="w-full flex flex-col justify-center items-center group hover:cursor-pointer">
                <li
                  className="text-slate-400 hover:text-white duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/login";
                  }}
                >
                  Login
                </li>
              </li>
              <li className="w-full flex flex-col justify-center items-center group hover:cursor-pointer">
                <li
                  className="text-slate-400 hover:text-white duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/register";
                  }}
                >
                  Register
                </li>
              </li>
            </div>
          </div>
          <div className="group w-[40%] flex items-center justify-center h-[5%] border border-[#dc143c] hover:border-white duration-300 group hover:cursor-pointer">
            <li className="text-[#dc143c] group-hover:text-white duration-300 text-xl list-none">
              <Link
                to="Home"
                smooth={true}
                duration={300}
                onClick={() => setShowSidePanel(false)}
              >
                Home
              </Link>
            </li>
          </div>
          <div className="group w-[40%] flex items-center justify-center h-[5%] border border-[#dc143c] hover:border-white duration-300 group hover:cursor-pointer">
            <li className="text-[#dc143c] group-hover:text-white duration-300 text-xl list-none">
              <Link
                to="About"
                smooth={true}
                duration={300}
                onClick={() => setShowSidePanel(false)}
              >
                About
              </Link>
            </li>
          </div>
          <div className="group w-[40%] flex items-center justify-center h-[5%] border border-[#dc143c] hover:border-white duration-300 group hover:cursor-pointer">
            <li className="text-[#dc143c] group-hover:text-white duration-300 text-xl list-none">
              <Link
                to="Services"
                smooth={true}
                duration={300}
                onClick={() => setShowSidePanel(false)}
              >
                Services
              </Link>
            </li>
          </div>
          <div className="group w-[40%] flex items-center justify-center h-[5%] border border-[#dc143c] hover:border-white duration-300 group hover:cursor-pointer">
            <li className="text-[#dc143c] group-hover:text-white duration-300 text-xl list-none">
              <Link
                to="Contributors"
                smooth={true}
                duration={300}
                onClick={() => setShowSidePanel(false)}
              >
                Contributors
              </Link>
            </li>
          </div>
        </div>
      )}

      {/* nav-list */}
      <ul className="flex flex-row gap-6 hover:cursor-pointer items-center max-md:hidden">
        <div className="group" onClick={() => setDarkMode(!darkMode)}>
          <li className="text-slate-400 hover:text-white duration-300">
            {darkMode ? <BiSun size={30} /> : <BsFillMoonFill size={20} />}
          </li>
        </div>
        <div className="group">
          <li className="text-slate-400 hover:text-white duration-300">
            <Link to="Home" smooth={true} duration={700}>
              Home
            </Link>
          </li>
          <div className="w-0 h-[3px] bg-[#dc143c] group-hover:w-full duration-300"></div>
        </div>
        <div className="group">
          <li className="text-slate-400 hover:text-white duration-300">
            <Link to="About" smooth={true} duration={700}>
              About
            </Link>
          </li>
          <div className="w-0 h-[3px] bg-[#dc143c] group-hover:w-full duration-300"></div>
        </div>
        <div className="group">
          <li className="text-slate-400 hover:text-white duration-300">
            <Link to="Services" smooth={true} duration={700}>
              Services
            </Link>
          </li>
          <div className="w-0 h-[3px] bg-[#dc143c] group-hover:w-full duration-300"></div>
        </div>
        <div className="group">
          <li className="text-slate-400 hover:text-white duration-300">
            <Link to="Contributors" smooth={true} duration={700}>
              Contributors
            </Link>
          </li>
          <div className="w-0 h-[3px] bg-[#dc143c] group-hover:w-full duration-300"></div>
        </div>
        <div
          className="group"
          onClick={(e) => {
            e.preventDefault();
            setDropDown(!dropDown);
          }}
        >
          <div className="flex flex-row justify-center items-center gap-2">
            <li className="text-slate-400 hover:text-white duration-300 flex flex-row justify-center items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-slate-500 flex items-end overflow-hidden">
                <div className="overflow-hidden w-full my-[-4px]">
                  {console.log(auth_token)}
                  {auth_token == null ? (
                    <BsPersonFill size={40} />
                  ) : (
                    <img
                      src="https://i.pinimg.com/originals/57/b7/f9/57b7f9f27e7505dc2d0beab162069dcf.jpg"
                      alt=""
                    />
                  )}
                </div>
              </div>
              <IoIosArrowDown />
            </li>
          </div>
        </div>
        <div
          className={`w-[100px] h-auto bg-black/30 top-[70px] right-2 py-2 ${
            dropDown ? "absolute" : "hidden"
          }`}
        >
          <li className="w-full flex flex-col justify-center items-center group">
            <li
              className="text-slate-400 hover:text-white duration-300"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/login";
              }}
            >
              Login
            </li>
            <div className="w-0 h-[3px] bg-[#dc143c] group-hover:w-[50%] duration-300"></div>
          </li>
          <li className="w-full flex flex-col justify-center items-center group">
            <li
              className="text-slate-400 hover:text-white duration-300"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/register";
              }}
            >
              Register
            </li>
            <div className="w-0 h-[3px] bg-[#dc143c] group-hover:w-[60%] duration-300"></div>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;

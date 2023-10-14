import { React, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaArrowRightLong } from "react-icons/fa6";
const Node = ({ node }) => {
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".box", { opacity: 1, x: -20 });
    });
    return () => ctx.revert();
  }, []);
  return (
    <div className="flex flex-row items-center">
      <div className="box w-[50px] h-[50px] rounded-full flex justify-center items-center border-4 border-green-800 font-bold text-green-800 text-3xl opacity-5">
        {node}
      </div>
      <div className="translate-x-[-21px]">
        <FaArrowRightLong size={30} color="#2E7D32" />
      </div>
    </div>
  );
};

export default Node;

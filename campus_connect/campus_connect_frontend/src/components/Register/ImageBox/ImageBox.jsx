import React from "react";

const ImageBox = () => {
  return (
    <div className="w-full h-screen relative z-0 max-md:hidden">
      <div className="w-full h-[100%] bg-gradient-to-r from-green-400/40 to-blue-500/80 relative z-10"></div>
      <img
        className="w-full h-[100%] object-cover absolute top-0 right-0 z-0"
        src="https://sec.gsu.edu/files/2021/01/feature-image-ADM-APPLY-1.jpg"
        alt=""
      />
    </div>
  );
};

export default ImageBox;

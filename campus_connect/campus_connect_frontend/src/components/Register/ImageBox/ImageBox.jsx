import React from "react";

const ImageBox = ({ darkMode }) => {
  return (
    <div className="w-full h-screen relative z-0 max-md:hidden">
      <div className="w-full h-[100%] bg-gradient-to-r from-green-400/40 to-blue-500/80 relative z-10"></div>

      {darkMode ? (
        <img
          className="w-full h-[100%] object-cover absolute top-0 right-0 z-0"
          src="https://law.gsu.edu/files/2019/06/20070928_Commons_Skyline_300.jpg"
          alt=""
        />
      ) : (
        <img
          className="w-full h-[100%] object-cover absolute top-0 right-0 z-0"
          src="https://sec.gsu.edu/files/2021/01/feature-image-ADM-APPLY-1.jpg"
          alt=""
        />
      )}
    </div>
  );
};

export default ImageBox;

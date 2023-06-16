import React from "react";
import ImageBox from "./ImageBox/ImageBox";
import ContentBox from "./ContentBox/ContentBox";

const Login = ({ darkMode }) => {
  return (
    <div className="w-full h-screen flex flex-row relative">
      <ImageBox darkMode={darkMode} />
      <ContentBox darkMode={darkMode} />
    </div>
  );
};

export default Login;

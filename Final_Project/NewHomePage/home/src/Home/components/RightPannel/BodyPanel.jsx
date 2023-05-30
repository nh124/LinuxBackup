import React, { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import Body from "./Body/Body";

const BodyPanel = () => {
  const [status, setStatus] = useState(false);

  // useEffect(() => {
  //   console.log(status);
  // }, [status]);
  return (
    <div className="w-[83%] h-screen">
      <Navbar setStatus={setStatus} status={status} />
      <Body status={status} />
    </div>
  );
};

export default BodyPanel;

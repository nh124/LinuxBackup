import { React, useState } from "react";
import ImageBox from "./ImageBox/ImageBox";
import Overlay from "../Overlay";
import ContentBox from "./ContentBox/ContentBox";
import PopUp from "../Login/ContentBox/OAuthAuthentication/PopUp";
import { BiCodeAlt } from "react-icons/bi";

const Register = ({ darkMode }) => {
  const [PopupActive, setPopUpActive] = useState(false);
  return (
    <div className="w-full h-screen flex flex-row relative">
      <PopUp
        setPopUpActive={setPopUpActive}
        PopupActive={PopupActive}
        icon={<BiCodeAlt size={30} />}
        dialogue={"Under Development"}
      />

      <Overlay PopupActive={PopupActive} />
      <ImageBox darkMode={darkMode} />
      <ContentBox darkMode={darkMode} setPopUpActive={setPopUpActive} />
    </div>
  );
};

export default Register;

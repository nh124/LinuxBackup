import { React, useState, useEffect } from "react";
import BodyPanel from "./components/RightPannel/BodyPanel";
import LeftPanel from "./components/LeftPanel/LeftPanel";
import axios from "axios";

function Home({ darkMode, setDarkMode }) {
  const [leftPanelShow, setLeftPanelShow] = useState(false);
  const [userData, setUserData] = useState([]);
  const [tab, setTab] = useState("Home");
  const auth_token = localStorage.getItem("auth_token");
  const [showEditAbout, setShowEditAbout] = useState(false);
  const endpoint = process.env.REACT_APP_SERVICE_URI;

  const getAuthenticatedUser = () => {
    axios
      .get(endpoint+"/api/v1/access-point/user", {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAuthenticatedUser();
  }, []);
  useEffect(() => {
    console.log(tab);
  }, [tab]);

  return (
    <div className="w-full h-screen flex flex-row relative">
      <div
        className={`bg-black/50 absolute top-0 right-0 w-full h-screen z-10 ${
          showEditAbout ? "flex" : "hidden"
        }`}
      ></div>
      <LeftPanel
        userData={userData}
        leftPanelShow={leftPanelShow}
        setLeftPanelShow={setLeftPanelShow}
        darkMode={darkMode}
        setTab={setTab}
      />
      <BodyPanel
        showEditAbout={showEditAbout}
        setShowEditAbout={setShowEditAbout}
        userData={userData}
        setLeftPanelShow={setLeftPanelShow}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        tab={tab}
      />
    </div>
  );
}

export default Home;

import { React, useState, useEffect } from "react";
import BodyPanel from "./components/RightPannel/BodyPanel";
import LeftPanel from "./components/LeftPanel/LeftPanel";
import axios from "axios";

function Home() {
  const [leftPanelShow, setLeftPanelShow] = useState(false);
  const [userData, setUserData] = useState([]);
  const auth_token = localStorage.getItem("auth_token");

  const getAuthenticatedUser = () => {
    axios
      .get("http://localhost:8080/api/v1/access-point/user", {
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

  return (
    <div className="w-full h-screen flex flex-row max-sm:w-[110%] relative">
      <LeftPanel
        userData={userData}
        leftPanelShow={leftPanelShow}
        setLeftPanelShow={setLeftPanelShow}
      />
      <BodyPanel userData={userData} setLeftPanelShow={setLeftPanelShow} />
    </div>
  );
}

export default Home;

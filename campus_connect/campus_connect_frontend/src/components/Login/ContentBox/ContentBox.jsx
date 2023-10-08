import { React, useState } from "react";
import OAuth from "./OAuthAuthentication/OAuth";
import FormAuth from "./FormAuthentication/FormAuth";
import axios from "axios";
import { RiHomeLine } from "react-icons/ri";
const endpoint = process.env.REACT_APP_SERVICE_URI;
const ContentBox = ({ darkMode, setPopUpActive }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [map_of_field_status, setMap_of_field_status] = useState(
    new Map([
      ["username", false],
      ["password", false],
    ])
  );
  const [AuthenticationFailed, setAuthenticationFailed] = useState(false);
  const AddUser = () => {
    const data = {
      username: username,
      password: password,
    };
    const list_of_fields = [password, username];

    const responseHandler = (response) => {
      setAuthenticationFailed(true);
    };

    if (!list_of_fields.includes("")) {
      JSON.stringify(data);

      axios
        .post(endpoint + "/api/v1/auth/authenticate", data)
        .then((response) => {
          localStorage.setItem("auth_token", response.data.token);
          window.location.href = `/home`;
        })
        .catch((error) => {
          responseHandler(error.response.data);
        });
    }
  };

  return (
    <div
      className={`w-[50%] h-screen absolute z-10 right-0 rounded-tl-3xl rounded-bl-3xl shadow-lg flex justify-center items-center max-md:w-full max-md:rounded-none ${
        darkMode ? "bg-[#05193a]" : "bg-white"
      }`}
    >
      <div className="w-full h-[80%] flex flex-col px-4 py-4 justify-center items-center">
        <OAuth darkMode={darkMode} setPopUpActive={setPopUpActive} />
        <div className="w-full h-[20%] flex justify-center items-center text-[#54BEB8]">
          -OR-
        </div>
        <FormAuth
          setUsername={setUsername}
          setPassword={setPassword}
          AddUser={AddUser}
          map_of_field_status={map_of_field_status}
          setMap_of_field_status={setMap_of_field_status}
          AuthenticationFailed={AuthenticationFailed}
          darkMode={darkMode}
        />
      </div>
      <RiHomeLine
        size={30}
        className="absolute top-4 right-4 hover:cursor-pointer"
        color={`${darkMode ? "white" : "black"}`}
        onClick={(e) => {
          e.preventDefault();
          window.location.href = "/";
        }}
      />
    </div>
  );
};

export default ContentBox;

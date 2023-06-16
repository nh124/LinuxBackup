import { React, useState } from "react";
import OAuth from "./OAuthAuthentication/OAuth";
import FormAuth from "./FormAuthentication/FormAuth";
import axios from "axios";
import { RiHomeLine } from "react-icons/ri";
const ContentBox = () => {
  const [fist_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [emptyField, setEmptyField] = useState([]);
  const [map_of_field_status, setMap_of_field_status] = useState(
    new Map([
      ["firstname", false],
      ["lastname", false],
      ["email", false],
      ["password", false],
      ["username", false],
      ["role", false],
    ])
  );
  const [usernameMatch, setUsernameMatch] = useState(false);
  const AddUser = () => {
    const data = {
      fistname: fist_name,
      lastname: last_name,
      email: email,
      password: password,
      username: username,
      role: role.toUpperCase(),
    };
    const list_of_fields = [
      fist_name,
      last_name,
      email,
      password,
      username,
      role,
    ];

    const responseHandler = (response) => {
      setUsernameMatch(true);
      setMap_of_field_status(
        new Map(map_of_field_status.set("username", false))
      );
    };

    if (!list_of_fields.includes("")) {
      JSON.stringify(data);
      console.log(data);

      axios
        .post("http://localhost:8080/api/v1/auth/register", data)
        .then(() => {
          window.location.href = "/login";
        })
        .catch((error) => {
          responseHandler(error.response.data);
        });
    }
  };

  return (
    <div className="w-[50%] h-screen absolute z-10 bg-white right-0 rounded-tl-3xl rounded-bl-3xl shadow-lg flex justify-center items-center max-md:w-full">
      <div className="w-full h-[80%] flex flex-col px-4 py-4 justify-center items-center">
        <OAuth />
        <div className="w-full h-[20%] flex justify-center items-center text-[#54BEB8]">
          -OR-
        </div>
        <FormAuth
          setFirst_name={setFirst_name}
          setLast_name={setLast_name}
          setEmail={setEmail}
          setPassword={setPassword}
          setUsername={setUsername}
          setRole={setRole}
          AddUser={AddUser}
          map_of_field_status={map_of_field_status}
          setMap_of_field_status={setMap_of_field_status}
          usernameMatch={usernameMatch}
        />
        <RiHomeLine
          size={30}
          className="absolute top-4 right-4 hover:cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/";
          }}
        />
      </div>
    </div>
  );
};

export default ContentBox;
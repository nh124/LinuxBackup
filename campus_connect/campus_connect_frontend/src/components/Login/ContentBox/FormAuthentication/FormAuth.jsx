import { React, useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
const FormAuth = ({
  setUsername,
  setPassword,
  AddUser,
  map_of_field_status,
  setMap_of_field_status,
  usernameMatch,
  AuthenticationFailed,
  darkMode,
}) => {
  const [usernameStatus, setUsernameStatus] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);

  const onchangeStatus = (field) => {
    setMap_of_field_status(new Map(map_of_field_status.set(field, "true")));
  };

  const emptyFieldStatus = () => {
    if (!map_of_field_status.get("username")) {
      setUsernameStatus(true);
    }
    if (!map_of_field_status.get("password")) {
      setPasswordStatus(true);
    }

    if (
      !map_of_field_status.get("username") ||
      !map_of_field_status.get("password") ||
      AuthenticationFailed
    ) {
      setErrorStatus(true);
    }
    console.log(AuthenticationFailed);
  };
  return (
    <div className="w-[60%] h-auto flex flex-col px-3 py-3 max-md:w-full">
      <form
        action="/login"
        method="POST"
        className="flex flex-col gap-4 px-3 py-3"
      >
        <div
          className={`w-full col-span-2 px-3 py-3 flex justify-center bg-red-700 text-white ${
            errorStatus ? "flex" : "hidden"
          }`}
        >
          {AuthenticationFailed ? (
            <h2 className="font-extrabold">
              Your username or password is incorrect
            </h2>
          ) : (
            <h2 className="font-extrabold">
              Please fill in the required fields
            </h2>
          )}
        </div>
        <div className="relative">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className={`px-1 py-1 focus:outline-none text-gray-700 w-full ${
              darkMode ? "bg-[#05193a] text-white" : ""
            } ${usernameStatus ? "border-red-500 border-b-4" : "border-b"}`}
            required
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameStatus(false);
              onchangeStatus("username");
            }}
          />
          <BsExclamationCircle
            className={`right-0 top-[20%] ${
              usernameStatus ? "absolute" : "hidden"
            }`}
            color="red"
          />
        </div>
        <div className="relative">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className={`px-1 py-1 focus:outline-none text-gray-700 w-full ${
              darkMode ? "bg-[#05193a] text-white" : ""
            } ${passwordStatus ? "border-red-500 border-b-4" : "border-b"}`}
            required
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordStatus(false);
              onchangeStatus("password");
            }}
          />
          <BsExclamationCircle
            className={`right-0 top-[20%] ${
              passwordStatus ? "absolute" : "hidden"
            }`}
            color="red"
          />
        </div>

        <button
          className={`w-full h-[100%] col-span-2 bg-[#279574] rounded-md px-2 py-2 text-white hover:bg-[#179e75] duration-200 ${
            darkMode ? "bg-[#6a43cc] hover:bg-[#351c75]" : ""
          }`}
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            emptyFieldStatus();
            AddUser();
          }}
        >
          Login
        </button>
        <div className="flex flex-row gap-2 items-center col-span-2">
          <h2 className="text-[#54BEB8]">Don't have an account?</h2>
          <button
            className={`text-sm ${darkMode ? "text-white" : ""}`}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/register";
            }}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAuth;

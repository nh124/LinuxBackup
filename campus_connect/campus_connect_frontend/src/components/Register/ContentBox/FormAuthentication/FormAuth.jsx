import { React, useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
const FormAuth = ({
  setFirst_name,
  setLast_name,
  setEmail,
  setPassword,
  setUsername,
  setRole,
  AddUser,
  map_of_field_status,
  setMap_of_field_status,
  usernameMatch,
  darkMode,
}) => {
  const [firstNameStatus, setFirstNameStatus] = useState(false);
  const [lastNameStatus, setLastNameStatus] = useState(false);
  const [emailStatus, setEmailStatus] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [roleNameStatus, setRoleStatus] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);

  const onchangeStatus = (field) => {
    setMap_of_field_status(new Map(map_of_field_status.set(field, "true")));
  };

  const emptyFieldStatus = () => {
    if (!map_of_field_status.get("firstname")) {
      setFirstNameStatus(true);
    }
    if (!map_of_field_status.get("lastname")) {
      setLastNameStatus(true);
    }
    if (!map_of_field_status.get("email")) {
      setEmailStatus(true);
    }
    if (!map_of_field_status.get("username")) {
      setUsernameStatus(true);
    }
    if (!map_of_field_status.get("password")) {
      setPasswordStatus(true);
    }
    if (!map_of_field_status.get("role")) {
      setRoleStatus(true);
    }
    if (
      !map_of_field_status.get("firstname") ||
      !map_of_field_status.get("lastname") ||
      !map_of_field_status.get("username") ||
      !map_of_field_status.get("password") ||
      !map_of_field_status.get("email") ||
      !map_of_field_status.get("role") ||
      usernameMatch
    ) {
      setErrorStatus(true);
    }
    console.log(usernameMatch);
  };
  return (
    <div className="w-[60%] h-auto flex flex-col px-3 py-3 max-md:w-full">
      <form
        action="/login"
        method="POST"
        className="grid grid-cols-2 gap-4 px-3 py-3"
      >
        <div
          className={`w-full col-span-2 px-3 py-3 flex justify-center bg-red-700 text-white ${
            !errorStatus ? "hidden" : "flex"
          }`}
        >
          {!usernameMatch ? (
            <h2 className="font-extrabold">
              Please fill in the required fields
            </h2>
          ) : (
            <h2 className="font-extrabold">This username is already taken</h2>
          )}
        </div>
        <div className="relative">
          <input
            type="text"
            name="first_name"
            id="fist_name"
            placeholder="First Name"
            className={`px-1 py-1 focus:outline-none text-gray-700 ${
              darkMode ? "bg-[#05193a] text-white" : ""
            } w-full ${
              firstNameStatus ? "border-red-500 border-b-4" : "border-b"
            }`}
            required
            onChange={(e) => {
              setFirst_name(e.target.value);
              setFirstNameStatus(false);
              onchangeStatus("firstname");
            }}
          />
          <BsExclamationCircle
            className={`right-0 top-[20%] ${
              firstNameStatus ? "absolute" : "hidden"
            }`}
            color="red"
          />
        </div>
        <div className="relative">
          <input
            type="text"
            name="last_name"
            id="last_name"
            placeholder="Last Name"
            className={`px-1 py-1 focus:outline-none text-gray-700 ${
              darkMode ? "bg-[#05193a] text-white" : ""
            }  w-full ${
              lastNameStatus ? "border-red-500 border-b-4" : "border-b"
            }`}
            required
            onChange={(e) => {
              setLast_name(e.target.value);
              setLastNameStatus(false);
              onchangeStatus("lastname");
            }}
          />
          <BsExclamationCircle
            className={`right-0 top-[20%] ${
              lastNameStatus ? "absolute" : "hidden"
            }`}
            color="red"
          />
        </div>
        <div className="relative col-span-2">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className={`px-1 py-1 focus:outline-none text-gray-700 ${
              darkMode ? "bg-[#05193a] text-white" : ""
            }  w-full ${
              emailStatus ? "border-red-500 border-b-4" : "border-b"
            }`}
            required
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailStatus(false);
              onchangeStatus("email");
            }}
          />
          <BsExclamationCircle
            className={`right-0 top-[20%] ${
              emailStatus ? "absolute" : "hidden"
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
            className={`px-1 py-1 focus:outline-none text-gray-700 ${
              darkMode ? "bg-[#05193a] text-white" : ""
            }  w-full ${
              passwordStatus ? "border-red-500 border-b-4" : "border-b"
            }`}
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
        <div className="relative">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className={`px-1 py-1 focus:outline-none text-gray-700 ${
              darkMode ? "bg-[#05193a] text-white" : ""
            }  w-full ${
              usernameStatus ? "border-red-500 border-b-4" : "border-b"
            }`}
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
        <div className="col-span-2 relative">
          <select
            name="role"
            id="role"
            className={`block py-2.5 px-1 w-full text-sm text-gray-500 bg-transparent border-b appearance-none  focus:outline-none focus:ring-0 focus:border-gray-200 peer col-span-2 ${
              roleNameStatus ? "border-red-500 border-b-4" : "border-b"
            }`}
            required
            onChange={(e) => {
              setRole(e.target.value);
              setRoleStatus(false);
              onchangeStatus("role");
            }}
          >
            <option value="Select...">Select...</option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
          </select>
          <BsExclamationCircle
            className={`right-0 top-[20%] ${
              roleNameStatus ? "absolute" : "hidden"
            }`}
            color="red"
          />
        </div>

        <button
          className="w-full h-[100%] col-span-2 bg-[#279574] rounded-md px-2 py-2 text-white hover:bg-[#179e75] duration-200"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            emptyFieldStatus();
            AddUser();
          }}
        >
          Register
        </button>
        <div className="flex flex-row gap-2 items-center col-span-2">
          <h2 className="text-[#54BEB8]">Already have an account?</h2>
          <button
            className={`text-sm ${darkMode ? "text-white" : ""}`}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/login";
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAuth;

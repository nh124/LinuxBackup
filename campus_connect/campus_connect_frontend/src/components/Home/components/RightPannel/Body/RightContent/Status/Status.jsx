import { React, useEffect, useState } from "react";
import axios from "axios";

const Status = ({ darkMode }) => {
  const [CountStudent, setCountStudent] = useState(0);
  const [CountTeacher, setCountTeacher] = useState(0);
  const auth_token = localStorage.getItem("auth_token");
  const endpoint = process.env.REACT_APP_SERVICE_URI;
  const CountUser = () => {
    axios
      .get(endpoint + "/api/v1/access-point/UserCount/TEACHER", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth_token}`,
        },
        body: JSON.stringify(),
      })
      .then((response) => {
        setCountTeacher(response.data);
      })
      .catch((error) => {
        window.location.href = "/login";
      });
    axios
      .get(endpoint + "/api/v1/access-point/UserCount/STUDENT", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth_token}`,
        },
        body: JSON.stringify(),
      })
      .then((response) => {
        setCountStudent(response.data);
      })
      .catch((error) => {
        window.location.href = "/login";
      });
  };
  useEffect(() => {
    CountUser();
  }, []);

  return (
    <div
      className={`h-[81px] flex flex-row justify-between items-center ${
        darkMode ? "bg-gray-600" : "bg-white"
      } mt-3`}
    >
      <div
        className={`w-full h-[81px] flex items-center ${
          darkMode ? "border-r border-gray-500" : "border-r"
        }`}
      >
        <div className="flex flex-col px-3">
          <span className="text-[10px]">Students</span>
          <span className="text-[#76E699] text-2xl ml-4">{CountStudent}</span>
        </div>
      </div>
      <div
        className={`w-full h-[81px] flex items-center ${
          darkMode ? "border-r border-gray-500" : "border-r"
        }`}
      >
        <div className="flex flex-col px-3">
          <span className="text-[10px]">Teachers</span>
          <span className="text-[#F2699F] text-2xl ml-4">{CountTeacher}</span>
        </div>
      </div>
      <div className="w-full h-[81px] flex items-center">
        <div className="flex flex-col px-3">
          <span className="text-[10px]">Students</span>
          <span className="text-[#F5A623] text-2xl ml-4">359</span>
        </div>
      </div>
    </div>
  );
};

export default Status;

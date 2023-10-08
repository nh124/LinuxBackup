import React, { useState, useEffect } from "react";
import { Students } from "./stdInfo";
import StudentCard from "./StudentCard";
import axios from "axios";

const ListOfStd = ({ darkMode }) => {
  const [hidden, setHidden] = useState(true);
  const auth_token = localStorage.getItem("auth_token");
  const [studentData, setStudentData] = useState([]);
  const endpoint = process.env.REACT_APP_SERVICE_URI;
  const getData = () => {
    axios
      .get(endpoint + "/api/v1/access-point/getUsers", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth_token}`,
        },
        body: JSON.stringify(),
      })
      .then((response) => {
        setStudentData(response.data);
        console.log(studentData[0]);
      })
      .catch((error) => {
        console.log(error);
        window.location.href = "/login";
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={`flex flex-col gap-2 py-3 max-h-[100%]`}>
      <h2>Students</h2>
      <div
        className={`flex flex-col gap-2  max-h-[100%] ${
          darkMode ? "bg-gray-600" : "bg-white"
        } ${hidden ? "overflow-hidden" : "overflow-auto"} ${
          hidden ? "h-[248px]" : "h-[50%] "
        }`}
      >
        {studentData.map((std, idx) => (
          <StudentCard
            key={idx}
            name={`${std.firstName} ${std.lastName}`}
            level={std.username}
            status={std.authorities[0].authority}
            darkMode={darkMode}
          />
        ))}
      </div>
      <button
        className="bg-[#6A68FF] text-white h-[40px] hover:bg-[#8583ff]"
        onClick={() => {
          setHidden(!hidden);
        }}
      >
        {hidden ? "View More" : "View Less"}
      </button>
    </div>
  );
};

export default ListOfStd;

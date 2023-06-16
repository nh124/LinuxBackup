import React, { useState, useEffect } from "react";
import { Students } from "./stdInfo";
import StudentCard from "./StudentCard";
import axios from "axios";

const ListOfStd = () => {
  const [hidden, setHidden] = useState(true);
  const auth_token = localStorage.getItem("auth_token");
  const [studentData, setStudentData] = useState([]);

  const getData = () => {
    axios
      .get("http://localhost:8080/api/v1/access-point/getUsers", {
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
        window.location.href = "/login";
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col gap-2 mt-3">
      <h2>Students</h2>
      <div
        className={`flex flex-col gap-2 bg-white max-h-[650px] ${
          hidden ? "overflow-hidden" : "overflow-auto"
        } ${hidden ? "h-[248px]" : "h-auto"}`}
      >
        {studentData.map((std, idx) => (
          <StudentCard
            key={idx}
            name={`${std.firstName} ${std.lastName}`}
            level={std.username}
            status={std.authorities[0].authority}
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

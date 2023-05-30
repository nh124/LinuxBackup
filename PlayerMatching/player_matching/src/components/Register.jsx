import { React, useState } from "react";
import axios from "axios";

const Register = () => {
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [Email, setEmail] = useState("");
  const [bio, setbio] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [skills, setSkills] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [error, setError] = useState(false);

  const postUserData = () => {
    if (password == confirmPassword) {
      setPasswordMatch(true);
    }
    if (!passwordMatch) {
      setError(true);
    } else {
      setError(false);
      const data = {
        Fname: Fname,
        Lname: Lname,
        Email: Email,
        bio: bio,
        phone: phone,
        password: password,
        skills: skills,
      };
      axios
        .post("http://127.0.0.1:5000/register", data)
        .then(function (response) {
          console.log(response.status);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div className="w-full h-screen bg-[#48066F] flex flex-row justify-center items-center">
      <div className="hidden w-[600px] h-[600px] bg-black md:flex flex-col justify-center items-center">
        <img
          className="w-full h-screen"
          src="https://cdn.mos.cms.futurecdn.net/4MLyNZ66GSMUp7z49Q8k3K.jpg"
          alt=""
        />
      </div>
      <div className="w-[600px] h-[600px] bg-white flex flex-col px-4 py-4">
        <div className="h-screen flex flex-col justify-center items-center gap-4">
          <h2 className="text-base font-bold">Register</h2>
          {/* first name and last name */}
          <div className="flex flex-row gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <span className="text-base">First name</span>
              <input
                className="appearance-none border-2 border-gray-200 focus:outline-none focus:bg-white focus:border-purple-500 rounded px-1 py-1"
                onChange={(e) => setFname(e.target.value)}
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <span className="text-base">Last name</span>
              <input
                className="appearance-none border-2 border-gray-200 focus:outline-none focus:bg-white focus:border-purple-500 rounded px-2 py-1"
                onChange={(e) => setLname(e.target.value)}
                type="text"
              />
            </div>
          </div>
          {/* email */}
          <div className="flex flex-col gap-4 w-full">
            <span className="text-base">Email</span>
            <input
              className="w-full appearance-none border-2 border-gray-200 focus:outline-none focus:bg-white focus:border-purple-500 rounded px-1 py-1"
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <span className="text-base">Bio</span>
            <input
              className="w-full appearance-none border-2 border-gray-200 focus:outline-none focus:bg-white focus:border-purple-500 rounded px-1 py-1"
              onChange={(e) => setbio(e.target.value)}
              type="text"
            />
          </div>
          <div className="flex flex-row gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <span className="text-base">Phone</span>
              <input
                className="appearance-none border-2 border-gray-200 focus:outline-none focus:bg-white focus:border-purple-500 rounded px-1 py-1"
                onChange={(e) => setPhone(e.target.value)}
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <span className="text-base">Skills</span>
              <input
                className="appearance-none border-2 border-gray-200 focus:outline-none focus:bg-white focus:border-purple-500 rounded px-2 py-1"
                onChange={(e) => setSkills(e.target.value)}
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-row gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <span className="text-base">Password</span>
              <input
                className="appearance-none border-2 border-gray-200 focus:outline-none focus:bg-white focus:border-purple-500 rounded px-1 py-1"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <span className="text-base">Confirm password</span>
              <input
                className="appearance-none border-2 border-gray-200 focus:outline-none focus:bg-white focus:border-purple-500 rounded px-2 py-1"
                style={{
                  borderColor: error ? "red" : "rgb(229 231 235)",
                }}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
              />
            </div>
          </div>
          <button
            className="bg-blue-600 text-white px-2 py-2 rounded w-full hover:bg-blue-700"
            onClick={postUserData}
          >
            Register
          </button>
          <p>
            ALready have an account?{" "}
            <a className="text-purple-600" href="/">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

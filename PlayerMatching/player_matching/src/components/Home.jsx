import { React, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Home = () => {
  const logout = () => {
    window.location.href = "/";
  };
  const [allUserData, setAllUserData] = useState([]);
  const getUserData = () => {
    axios({
      method: "get",
      url: "http://127.0.0.1:5000/getAllUsers",
      responseType: "json",
    }).then(function (response) {
      setAllUserData(response.data);
    });
    console.log(allUserData);
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div>
      <nav class="w-full h-[80px] bg-gray-200 flex justify-between items-center py-3 px-5">
        <h1>Nur Haque</h1>
        <div>
          <input
            id="search"
            type="text"
            class="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none"
            placeholder="Search anything..."
          />
          <button class="w-[100px] h-[60px] bg-red-400 text-white hover:bg-red-800 durations-300">
            search
          </button>
        </div>

        <ul class="flex nav_list">
          <button onClick={logout}>Logout</button>
        </ul>
      </nav>
      {allUserData.map((it) => {
        return (
          <div class="text-3xl" key={it}>
            <div class="w-full h-100px px-4 py-4 flex flex-col flex-wrap gap-4">
              <div class="max-w-sm rounded overflow-hidden shadow-lg flex flex-col justify-center items-center">
                <img
                  class="w-full h-[400px]"
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  alt="Sunset in the mountains"
                />
                <div class="px-6 py-4">
                  <div class="font-bold text-xl mb-2" id="name">
                    {it.name}
                  </div>
                  <p class="text-gray-700 text-base" id="bio">
                    {it.bio}
                  </p>
                </div>
                <div class="px-6 pt-4 pb-2">
                  {it.skills.split(" ").map((skill) => {
                    return (
                      <span
                        key={skill}
                        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        id="skill"
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
                <button class="w-[200px] h-[60px] bg-red-400 text-white hover:bg-red-800 durations-300 mb-[20px] rounded">
                  search
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;

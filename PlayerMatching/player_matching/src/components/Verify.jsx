import React from "react";

const Verify = () => {
  return (
    <div className="w-full h-screen flex flex-row justify-center items-center bg-[#48066F] px-3 py-4">
      <div className="hidden w-[600px] h-[600px] bg-black md:flex flex-col justify-center items-center">
        <img
          className="w-full h-screen"
          src="https://cdn.mos.cms.futurecdn.net/4MLyNZ66GSMUp7z49Q8k3K.jpg"
          alt="image"
        />
      </div>
      <div className="w-[600px] h-[600px] px-4 py-4 relative bg-white md:bg-white flex flex-col justify-center items-center">
        <div className="w-[300px] h-[400] px-4 py-4 flex flex-col gap-4 justify-center items-center">
          <h2 className="text-lg font-bold">Verify Phone Number</h2>
          <div className="flex flex-col gap-4 w-full required">
            <span>Phone</span>
            <input
              className="appearance-none border-2 border-gray-200 focus:outline-none focus:bg-white focus:border-purple-500 rounded px-2 py-1"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <span>Verification Code</span>
            <input
              type="password"
              className="appearance-none border-2  border-gray-200 focus:outline-none focus:bg-white focus:border-purple-500 rounded px-2 py-1"
            />
          </div>
          <button className="bg-blue-600 text-white px-2 py-2 rounded w-full hover:bg-blue-700">
            Verify
          </button>
          <p>
            <a className="text-purple-600" href="/register">
              Resend verification code
            </a>
          </p>
          <p>
            Return to Register
            <a className="text-purple-600" href="/register">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Verify;

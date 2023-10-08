import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";

const Card = () => {
  const score = 2.1;
  return (
    <div className="w-full h-auto bg-white shadow-lg rounded-lg flex">
      <div className="w-[30%]">
        <img
          className="w-full h-[100%] object-cover"
          src="https://lh3.googleusercontent.com/p/AF1QipOShSy1mgrnIKrXJ-0H7fNn33BqDooSAJD7VQz5=s680-w680-h510"
          alt=""
        />
      </div>

      <div className="w-full flex flex-col px-3 py-3">
        <span>eighty7sweets</span>
        <div className="w-full flex fle-row">
          {Array.from(Array(Math.round(score))).map((index) => {
            return <AiFillStar key={index} color="orange" />;
          })}
          {Array.from(Array(5 - Math.round(score))).map((index) => {
            return <AiOutlineStar key={index} color="orange" />;
          })}
        </div>

        <span>56 Broad St NW, Atlanta, GA 30303</span>
        <div className="w-full flex flex-rwo gap-2 items-center">
          <button className="bg-slate-200 px-2 py-1">Visit Page</button>
          <button className="bg-slate-200 px-2 py-1">Visit Page</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
// address
// rating
// url
// phone number

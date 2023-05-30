import React from "react";
import { experienceData } from "./experienceData";
import Experience from "./Experience";

const workExperience = experienceData;

const Experiences = () => {
  return (
    <div
      name="Experiences"
      className="w-full h-screen bg-[#0a192f] text-white px-5 py-5 flex flex-col justify-center items-center"
    >
      <div className="max-w-[1000px] m-auto px-4 py-16 md:pl-20">
        <h2 className="text-4xl font-bold border-b-4 border-pink-600 mb-5 max-w-[170px]">
          Experience
        </h2>
        {workExperience?.map((experience, index) => (
          <Experience
            key={index}
            job_title={experience.job_title}
            company={experience.company}
            date_range={experience.date_range}
            description={experience.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Experiences;

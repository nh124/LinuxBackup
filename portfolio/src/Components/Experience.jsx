import React from "react";

const Experience = ({ job_title, company, date_range, description }) => {
  return (
    <ol className="flex flex-col md:flex-row relative border-l border-stone-200">
      <li className="mb-3 ml-4 ">
        <div className="absolute w-3 h-3 bg-stone-200 rounded-full mt-1.5 -left-1.5  border-white" />
        <p className="flex flex-wrap gap-4 justify-start text-xs md:text-sm mb-5 max-w-[700px]">
          <span className="inline-block px-4 py-1 font-semibold text-white bg-pink-600 rounded-md">
            {date_range}
          </span>
          <span className="text-lg font-semibold text-stone-200 ">
            {company}
          </span>
          <span className="my-2 text-xs font-normal leading-none text-stone-300">
            {job_title}
          </span>
        </p>
        <span className="flex flex-col">
          {description?.map((element, index) => {
            return (
              <ul class="list-disc" key={index}>
                <li key={index}>{element}</li>
              </ul>
            );
          })}
        </span>
      </li>
    </ol>
  );
};

export default Experience;

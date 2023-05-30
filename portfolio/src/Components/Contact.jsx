import React from "react";

const Contact = () => {
  return (
    <div
      name="contact"
      className="w-full h-screen bg-[#0a192f] flex justify-center items-center p-4"
    >
      <form
        method="POST"
        action="https://getform.io/f/0ad6f7aa-5096-44f6-9de8-dcb0c39f2cdb"
        className="flex flex-col max-w-[600px] w-full"
      >
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-pink-600 text-gray-300">
            Contact
          </p>
          <p className="text-gray-300 py-4">
            // Submit the form below or shoot me an email -
            nur.haque99@gmail.com
          </p>
        </div>
        <input
          className="bg-[#292c2e] py-2 px-2 text-gray-300"
          type="text"
          placeholder="Name"
          name="name"
        />
        <input
          className="my-4 p-2 bg-[#292c2e] py-2 text-gray-300"
          type="email"
          placeholder="Email"
          name="email"
        />
        <textarea
          name="message"
          rows="10"
          className="bg-[#292c2e] py-2 px-2 text-gray-300"
          placeholder="Message"
        ></textarea>
        <button
          className="text-white border-2 hover:bg-pink-600 hover:border-pink-600 px-3 py-3 my-8 mx-auto flex items-center"
          duration={500}
        >
          Let's Collaborate
        </button>
      </form>
    </div>
  );
};

export default Contact;

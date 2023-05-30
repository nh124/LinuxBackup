import React, { useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import logo from "../Assets/logo.png";
import { BsFillMoonFill } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import MessageBox from "./MessageBox";
import UserBox from "./UserBox";

let stompClient = null;
const Chatroom = () => {
  const [userData, setUserData] = useState({
    username: "",
    receivername: "",
    connected: false,
    message: "",
  });
  const [test, setTest] = useState(false);
  const [publicChats, setPublicChats] = useState([]);
  const [privateChats, setPrivateChats] = useState(new Map());
  const [tab, setTab] = useState("CHATROOM");

  const connect = () => {
    let Sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnect, onError);
  };

  const onConnect = () => {
    setUserData({ ...userData, connected: true });
    setTest(true);
    stompClient.subscribe("/chatroom/public", onMessageReceived);
    stompClient.subscribe(
      "/usersEntity/" + userData.username + "/private",
      onPrivateMessageReceived
    );
    userJoin();
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const handleUsername = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, username: value });
  };
  const userJoin = () => {
    let message = {
      senderName: userData.username,
      status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(message));
  };

  const onPrivateMessageReceived = (message) => {
    // console.log(message);
    let messageData = JSON.parse(message.body);
    // console.log(privateChats.get(messageData.senderName));

    if (privateChats.get(messageData.senderName)) {
      privateChats.get(messageData.senderName).push(messageData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(messageData);
      privateChats.set(messageData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  };

  const onMessageReceived = (message) => {
    let messageData = JSON.parse(message.body);
    if (messageData.status === "JOIN") {
      if (!privateChats.get(messageData.senderName)) {
        privateChats.set(messageData.senderName, []);
        setPrivateChats(new Map(privateChats));
      }
    } else if (messageData.status === "MESSAGE") {
      publicChats.push(messageData);
      setPublicChats([...publicChats]);
    }
  };

  const sendMessage = () => {
    if (stompClient) {
      let messageContent = {
        senderName: userData.username,
        message: userData.message,
        status: "MESSAGE",
      };
      stompClient.send("/app/message", {}, JSON.stringify(messageContent));
    }
    console.log(userData.connected);
  };

  const sendPrivateMessage = () => {
    if (stompClient) {
      let messageContent = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
        status: "MESSAGE",
      };
      console.log(messageContent);
      if (userData.username != tab) {
        privateChats.get(tab).push(messageContent);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send(
        "/app/private-message",
        {},
        JSON.stringify(messageContent)
      );
      setUserData({ ...userData, message: "" });
    }
    console.log(userData.connected);
  };
  const onError = (err) => {
    console.log(err);
  };

  return (
    <>
      {!test ? (
        <div className="flex flex-col gap-2 w-[500px] h-screen justify-center items-center">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleUsername}
          />
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={connect}
          >
            connect
          </button>
        </div>
      ) : (
        <div className="flex flex-row gap-2 w-full h-screen">
          {/* usersEntity */}
          <div className="flex flex-row w-[30%] h-[830px] gap-1 mt-12 py-3 border-b border-black px-3">
            <ul className="w-full">
              <li
                onClick={() => setTab("CHATROOM")}
                className="w-full h-[50px] border border-gray-300 px-3 py-3 hover:cursor-pointer hover:bg-gray-400"
              >
                Chatroom
              </li>
              {[...privateChats.keys()].map(
                (name, idx) =>
                  name != userData.username && (
                    <li
                      className="w-full h-[50px] border border-gray-300 px-3 py-3 hover:cursor-pointer hover:bg-gray-400"
                      onClick={() => setTab(name)}
                      key={idx}
                    >
                      <span className="text-lg">{name}</span>
                    </li>
                  )
              )}
            </ul>
          </div>

          <div
            id="chatBox"
            className="flex flex-col gap-2 w-full h-screen justify-center items-center border-l border-gray-700 px-3"
          >
            {/* UserName */}
            <div className="flex justify-between items-center w-full h-[5%] bg-blue-100 absolute top-0 left-0 px-3 py-3">
              <div className="flex flex-row">
                <IoIosArrowBack size={30} color="blue" />
                <img src={logo} alt="" style={{ width: "80px" }} />
              </div>
              <h1 className="text-xl">{tab}</h1>
              <BsFillMoonFill size={30} />
            </div>
            <br />
            {/* messages */}
            {tab !== "CHATROOM" && (
              <>
                <span className="w-full h-[80%] bg-white-800 flex flex-col px-4 py-4 border-2 border-gray rounded overflow-auto">
                  {[...privateChats.get(tab)].map((chat, id) => {
                    return (
                      <>
                        {chat.senderName === userData.username && (
                          <div key={id} class="flex justify-end mb-4">
                            <div class="ml-2 py-3 px-4 bg-blue-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                              <p>{chat.message}</p>
                            </div>
                            <div class="ml-2 py-3 px-4 bg-blue-800 rounded-l text-white">
                              <p>{chat.senderName}</p>
                            </div>
                          </div>
                        )}
                        {chat.senderName !== userData.username && (
                          <div
                            key={id}
                            className="w-full flex flex-row items-start"
                          >
                            <div class="ml-2 py-3 px-4 bg-gray-700 rounded-l text-white">
                              <p>{chat.senderName}</p>
                            </div>
                            <div class="ml-2 py-3 px-4 bg-gray-400 rounded-bl-3xl rounded-tr-3xl rounded-tl-xl text-white">
                              <p>{chat.message}</p>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })}
                </span>
                {/* input */}
                <div className="flex flex-row gap-2 justify-center items-center w-full h-[10%]">
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 w-full text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleMessage}
                  />
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={sendPrivateMessage}
                  >
                    send
                  </button>
                </div>
              </>
            )}
            {tab === "CHATROOM" && (
              <>
                <span className="w-full h-[80%] bg-white-800 flex flex-col px-4 py-4 border-2 border-gray rounded overflow-auto">
                  {publicChats.map((chat, id) => {
                    return (
                      <>
                        {chat.senderName === userData.username && (
                          <div key={id} class="flex justify-end mb-4">
                            <div class="ml-2 py-3 px-4 bg-blue-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                              <p>{chat.message}</p>
                            </div>
                            <div class="ml-2 py-3 px-4 bg-blue-800 rounded-l text-white">
                              <p>{chat.senderName}</p>
                            </div>
                          </div>
                        )}
                        {chat.senderName !== userData.username && (
                          <div
                            key={id}
                            className="w-full flex flex-row items-start"
                          >
                            <div class="ml-2 py-3 px-4 bg-gray-700 rounded-l text-white">
                              <p>{chat.senderName}</p>
                            </div>
                            <div class="ml-2 py-3 px-4 bg-gray-400 rounded-bl-3xl rounded-tr-3xl rounded-tl-xl text-white">
                              <p>{chat.message}</p>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })}
                </span>
                {/* input */}
                <div className="flex flex-row gap-2 justify-center items-center w-full h-[10%]">
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 w-full text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleMessage}
                  />
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={sendMessage}
                  >
                    send
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Chatroom;

import React, { useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import Messages from "./Components/Messages";
import ChatBox from "./Components/ChatBox";

let stompClient = null;
function Chat() {
  const [userData, setUserData] = useState({
    username: "",
    receivername: "",
    connected: false,
    message: "",
  });
  const [publicChats, setPublicChats] = useState([]);
  const [privateChats, setPrivateChats] = useState(new Map());
  const [tab, setTab] = useState("CHATROOM");
  const [privateMessageData, setPrivateMessageData] = useState({});

  const connect = () => {
    let Sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnect, onError);
  };

  const onConnect = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe("/chatroom/public", onMessageReceived);
    stompClient.subscribe(
      "/user/" + userData.username + "/private",
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
    let messageData = JSON.parse(message.body);
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
  };

  const sendPrivateMessage = () => {
    if (stompClient) {
      let messageContent = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
        status: "MESSAGE",
      };
      if (userData.username != tab) {
        privateChats.get(tab).push(messageContent);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send(
        "/app/private-message",
        {},
        JSON.stringify(messageContent)
      );
      setPrivateMessageData(messageContent);
      setUserData({ ...userData, message: "" });
    }
  };
  const onError = (err) => {
    console.log(err);
  };
  return (
    <>
      {userData.connected ? (
        <div className="flex flex-row w-full h-screen">
          <Messages
            UserInformation={privateChats}
            setUser={setTab}
            UserData={userData}
            User={tab}
            privateMessageData={privateMessageData}
          />
          <ChatBox
            User={tab}
            userData={userData}
            ChatLogPublic={publicChats}
            ChatLogPrivate={privateChats}
            sendPublicMessages={sendMessage}
            sendPrivateMessages={sendPrivateMessage}
            handleMessage={handleMessage}
          />
        </div>
      ) : (
        <div className="w-full h-screen flex flex-row justify-center items-center">
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
      )}
    </>
  );
}

export default Chat;

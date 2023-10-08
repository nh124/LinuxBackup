import React, { useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import Messages from "./Components/Messages/Messages";
import ChatBox from "./Components/ChatBox";
import Loading from "./Loading";
import { UserConversations } from "./API/UserConversation";
import { getAllUsers } from "./API/GetAllUsers";
import { userDetails } from "./API/UserDetails";
import axios from "axios";
const endpoint = process.env.REACT_APP_SERVICE_URI;
function Chatroom({ darkMode, setDarkMode }) {
  const [userData, setUserData] = useState({
    user_id: "",
    name: "",
    username: "",
  });
  const [publicChats, setPublicChats] = useState([]);
  const [privateChats, setPrivateChats] = useState(new Map());
  const [tab, setTab] = useState("CHATROOM");
  const [stompClient, setStompClient] = useState(null);
  const [message, setMessage] = useState("");
  const [AllUsers, setAllUsers] = useState([]);
  const [LSideMenu, setLSideMenu] = useState(false);

  const handleMessage = (event) => {
    setMessage(event.target.value);
  };

  const getUserNames = (users) => {
    if (typeof users === "object") {
      const name_data = [];
      for (let user of AllUsers) {
        if (users.includes(user.id)) {
          let data = {
            id: user.id,
            name: user.firstName + " " + user.lastName,
          };
          name_data.push(data);
        }
      }
      return name_data;
    } else if (typeof users === "string") {
      for (let user of AllUsers) {
        if (user.firstName + " " + user.lastName === users) {
          return user.id;
        }
      }
    } else if (typeof users === "number") {
      for (let user of AllUsers) {
        if (user.id === users) {
          return user.firstName + " " + user.lastName;
        }
      }
    }
  };

  const PublicMessagesHandler = (response) => {
    let Public_Chat = [];
    for (let element of response) {
      if (element.type === "PUBLIC") {
        let message = {
          message: element.message,
          receiverId: element.receiver,
          type: element.type,
          userId: element.user.id,
          date: element.date,
        };
        Public_Chat.push(message);
      }
    }
    setPublicChats(Public_Chat);
  };
  const getUniqueUserMessages = (uniqueUserId, response) => {
    let listOfMessages = [];
    response.forEach((element) => {
      if (
        (element.receiver == uniqueUserId || element.user.id == uniqueUserId) &&
        (element.receiver === userData.user_id ||
          element.user.id == userData.user_id)
      ) {
        let message = {
          message: element.message,
          receiverId: element.receiver,
          type: element.type,
          userId: element.user.id,
          date: element.date,
        };
        listOfMessages.push(message);
      }
    });
    return listOfMessages;
  };
  const redirect = () => {
    window.location.href = "/login";
  };
  const PrivateMessagesHandler = (response) => {
    let users = [];
    let uniqueUserChat = new Map();

    response.map((element) => {
      if (element.type === "PRIVATE") {
        if (
          element.receiver === userData.user_id ||
          element.user.id === userData.user_id
        ) {
          users.push(element.user.id);
          users.push(element.receiver);
        }
      }
    });
    let uniqueUsers = [...new Set(users)];
    uniqueUsers.map((element) => {
      uniqueUserChat.set(
        getUserNames(element),
        getUniqueUserMessages(element, response)
      );
    });
    setPrivateChats(uniqueUserChat);
  };

  const getAllUsersHandler = () => {
    getAllUsers()
      .then((response) => {
        setAllUsers(response);
      })
      .catch((err) => redirect());
  };
  const userDetailsHandler = () => {
    userDetails()
      .then((response) => {
        const data = {
          user_id: response.id,
          name: response.firstName + " " + response.lastName,
          username: response.username,
        };
        setUserData(data);
      })
      .catch((err) => redirect());
  };

  useEffect(() => {
    userDetailsHandler();
    getAllUsersHandler();
    UserConversations()
      .then((response) => {
        PublicMessagesHandler(response);
      })
      .catch((err) => redirect());
  }, []);

  useEffect(() => {
    UserConversations()
      .then((response) => {
        PrivateMessagesHandler(response);
      })
      .catch((err) => redirect());
  }, [AllUsers]);

  const connect = () => {
    const socket = new SockJS(endpoint+"/ws");
    let stompClientConnect = over(socket);
    stompClientConnect.connect({}, function (frame) {
      setStompClient(stompClientConnect);
      stompClientConnect.subscribe("/chatroom/public", onPublicMessageReceived);
      let name = userData.name.replace(/\s/g, "");
      stompClientConnect.subscribe(
        "/user/" + name + "/private",
        onPrivateMessageReceived
      );
    });
  };
  const onPublicMessageReceived = (message) => {
    let messageData = JSON.parse(message.body);
    if (messageData.message !== "") {
      messageData.body.date = new Date();
      publicChats.push(messageData.body);
      setPublicChats([...publicChats]);
    }
  };

  const sendMessage = () => {
    let messageContent = {
      message: message,
      receiverId: 0,
      type: "PUBLIC",
      userId: userData.user_id,
    };
    if (messageContent.message !== "") {
      stompClient.send("/app/message", {}, JSON.stringify(messageContent));
      setMessage("");
    }
  };

  const onPrivateMessageReceived = (message) => {
    let messageData = JSON.parse(message.body);
    if (messageData.message !== "") {
      let name = getUserNames(messageData.userId);
      console.log(messageData);
      privateChats.get(name).push(messageData);
      setPrivateChats(new Map(privateChats));
    }
  };

  const sendPrivateMessage = () => {
    let messageContent = {
      message: message,
      receiverId: getUserNames(tab),
      type: "PRIVATE",
      userId: userData.user_id,
    };
    if (messageContent.message !== "") {
      setPrivateChats(new Map(privateChats));
      stompClient.send(
        "/app/private-message",
        {},
        JSON.stringify(messageContent)
      );
      messageContent.date = new Date();
      privateChats.get(tab).push(messageContent);
    }
  };
  const onError = (err) => {
    console.log(err);
  };

  return (
    <>
      {stompClient === null ? (
        <Loading connect={connect} darkMode={darkMode} userData={userData} />
      ) : (
        <div className="flex flex-row w-full h-screen relative">
          <Messages
            setDarkMode={setDarkMode}
            setLSideMenu={setLSideMenu}
            LSideMenu={LSideMenu}
            UserInformation={privateChats}
            setUser={setTab}
            UserData={userData}
            User={tab}
            darkMode={darkMode}
          />
          <ChatBox
            UserInformation={privateChats}
            AllUsers={AllUsers}
            setLSideMenu={setLSideMenu}
            LSideMenu={LSideMenu}
            User={tab}
            userData={userData}
            ChatLogPublic={publicChats}
            ChatLogPrivate={privateChats}
            setPrivateChats={setPrivateChats}
            sendPublicMessages={sendMessage}
            sendPrivateMessages={sendPrivateMessage}
            handleMessage={handleMessage}
            getUserNames={getUserNames}
            stompClient={stompClient}
            darkMode={darkMode}
          />
        </div>
      )}
    </>
  );
}

export default Chatroom;

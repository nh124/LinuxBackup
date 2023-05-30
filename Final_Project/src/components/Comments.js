import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Comment, GroupComment } from "./styles/comments.style";
import { CommentBox } from "./styles/commentBox.style";

let endPoint = "http://127.0.0.1:5000";
let socket = io.connect(`${endPoint}`);

const App = () => {
  const [messages, setMessages] = useState(["Hello And Welcome"]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const [AllUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getMessages();
  }, [messages.length]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getMessages = () => {
    socket.on("message", (msg) => {
      setMessages([...messages, msg]);
    });
  };
  const getAllUsers = () => {
    fetch("/getAllUsers").then((response) =>
      response.json().then((data) => {
        setAllUsers(data);
      })
    );
  };
  const getCurrUser = () => {
    fetch("/user").then((response) =>
      response.json().then((data) => {
        setUser(data);
      })
    );
  };
  // On Change
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    getCurrUser();
  }, []);

  // On Click
  const onClick = () => {
    if (message !== "") {
      socket.emit("message", message);
      setMessage("");
    } else {
      alert("Please Add A Message");
    }
  };

  return (
    <Comment>
      <div className="userActive">
        <ul>
          <li>
            <div className="pic"></div>
            <div className="userName">
              {AllUsers.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </div>
          </li>
        </ul>
      </div>

      <GroupComment>
        {messages.length > 0 &&
          messages.map((msg) => (
            <div key="msg">
              <p>
                {user} : {msg}
              </p>
            </div>
          ))}
        <CommentBox>
          <input value={message} name="message" onChange={(e) => onChange(e)} />
          <button onClick={() => onClick()}>Send Message</button>
        </CommentBox>
      </GroupComment>
    </Comment>
  );
};

export default App;

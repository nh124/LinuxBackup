import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Comment, Groups, GroupComment } from "./styles/comments.style";
import { GroupTab, Labels } from "./styles/GroupTab.style";
import { CommentBox } from "./styles/commentBox.style";

let endPoint = "http://127.0.0.1:5000";
let socket = io.connect(`${endPoint}`);

const App = () => {
  const [messages, setMessages] = useState(["Hello And Welcome"]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    getMessages();
  }, [messages.length]);

  const getMessages = () => {
    socket.on("message", (msg) => {
      setMessages([...messages, msg]);
    });
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
      <Groups>
        <GroupTab top="10px" color="white">
          <Labels>CSC 4530</Labels>
        </GroupTab>
        <GroupTab top="10px" color="white">
          <Labels>Rels 1000</Labels>
        </GroupTab>
        <GroupTab top="10px" color="white">
          <Labels>CSC 4230</Labels>
        </GroupTab>
        <GroupTab top="10px" color="white">
          <Labels>CSC 4130</Labels>
        </GroupTab>
        <GroupTab top="10px" color="white">
          <Labels>CSC 4030</Labels>
        </GroupTab>
      </Groups>

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

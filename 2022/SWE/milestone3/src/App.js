import React, { useState, useEffect } from "react";
import "./App.css";
import { Comments } from "./components/comments";

function App() {
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState([]);
  useEffect(() => {
    fetch("/commentDisplay").then((response) =>
      response.json().then((data) => {
        setComments(data);
      })
    );
  }, []);

  return (
    <div>
      <Comments ListOfComments={comments} />
    </div>
  );
}

export default App;

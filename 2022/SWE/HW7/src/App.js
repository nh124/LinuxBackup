import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState("");
  function handleClick() {
    fetch("/funFacts")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }
  useEffect(() => {
    handleClick();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button onClick={handleClick}>Click me!</button>
          <li>{data}</li>
        </div>
      </header>
    </div>
  );
}

export default App;

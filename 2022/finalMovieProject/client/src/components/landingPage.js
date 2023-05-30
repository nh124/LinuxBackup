import React from "react";
import { useState, useEffect } from "react";

function LandingPage() {
  const [number, setNumber] = useState("");
  let [movie, setMovie] = useState([]);
  const data = {
    number,
  };
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  const getPopularMovie = () => {
    fetch("/popularMovie", requestOptions).then((response) =>
      response.json().then((data) => {
        setMovie(data);
        for (let i = 0; i < 10; i++) {
          console.log(movie.results[i].original_title);
        }
      })
    );
  };
  return (
    <div>
      <span>number</span>
      <input type="text" onChange={(e) => setNumber(e.target.value)} />
      <button onClick={getPopularMovie}>Submit</button>
      {movie.map((mov) => {
        return <h1>{mov}</h1>;
      })}
    </div>
  );
}

export default LandingPage;

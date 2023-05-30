import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [fistname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const AddUser = () => {
    const data = {
      fistname: "fistname",
      lastname: "lastname",
      email: "email",
      password: "password",
    };
    JSON.stringify(data);
    console.log(data);
    axios
      .post("http://localhost:8080/api/v1/auth/register", data)
      .then((response) => console.log(response));
  };

  const login = () => {
    const data = {
      email: "email",
      password: "password",
    };
    JSON.stringify(data);
    console.log(data);
    axios
      .post("http://localhost:8080/api/v1/auth/authentication", data)
      .then((response) => setToken(response.data.token));
  };

  const getData = async () => {
    const response = await fetch("http://localhost:8080/api/v1/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(),
    });
    console.log(response.json());
  };

  return (
    <div className="App">
      <span>firstname</span>
      <input onChange={(e) => setFirstName(e.target)} type="text" />
      <br />
      <span>lastname</span>
      <input onChange={(e) => setLastName(e.target)} type="text" />
      <br />
      <span>email</span>
      <input onChange={(e) => setEmail(e.target)} type="text" />
      <br />
      <span>password</span>
      <input onChange={(e) => setPassword(e.target)} type="text" />
      <br />
      <button onClick={AddUser}>Submit</button>
      <button onClick={login}>login</button>
      <button onClick={getData}>Get Data</button>
    </div>
  );
}

export default App;

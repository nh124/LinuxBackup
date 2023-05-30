import React from "react";
import { useState } from "react";
import "./styles/loginStyle.css";

function Login() {
  const [gsu_id, setGsu_id] = useState("");
  const [password, setPassword] = useState("");
  const [incGsuID, setIncGsuID] = useState("");
  const [incPass, setIncPass] = useState("");

  const authenticate = async () => {
    const data = {
      gsu_id,
      password,
    };

    const responce = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(responce.status);
    if (responce.status === 404) {
      setIncGsuID("Incorrect username");
      console.log(incGsuID);

    } else if (responce.status === 401) {
      setIncPass("Incorrect Password");
      console.log(incPass);
    } else if (responce.status === 200) {
      window.location.href = "/home";
    } else {
      console.log("login unsuccessful");
    }
  };

  return (
    <section>
      <div className="imgBx">
        <img
          src="https://sec.gsu.edu/files/2021/01/feature-image-ADM-APPLY-1.jpg"
          alt="image"
        />
      </div>
      <div className="contentBox">
        <div className="formBx">
          <h2>Login</h2>
          <form>
            <div className="inputBx">
              <span>Username</span>
              <input
                type="text"
                required
                onChange={(e) => setGsu_id(e.target.value)}
              ></input>
            </div>
            <div className="inputBx">
              <span>Password</span>
              <input
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>

            <div className="signin">
              <label>
                <input
                  type="submit"
                  value="Sign in"
                  onClick={() => authenticate()}
                />
              </label>
            </div>
            <div className="signUp">
              <p>
                Dont have an account? <a href="/register">Sign up</a>
                <br />
                <a href="/">Return to the home screen?</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;

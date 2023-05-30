import { React, useState } from "react";

import "./styles/loginStyle.css";

function Login() {
  const [gsu_id, setGsu_id] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isActive, setIsActive] = useState(true);

  const authenticate = async () => {
    const data = {
      gsu_id,
      password,
    };
    const statusErrors = {
      404: "User not found",
      401: "This User Already Exists",
      402: "Please enter the required fields!",
    };
    setIsActive(false);
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status in statusErrors) {
      setMessage(statusErrors[response.status]);
    }
    if (response.status === 200) {
      window.location.href = "/home";
    }
  };

  return (
    <section>
      <div className="imgBx">
        <img
          src="https://cdn.vox-cdn.com/thumbor/x9EhCb6yRPu3n9PgHVh5b89x8bw=/0x0:4500x2520/1200x0/filters:focal(0x0:4500x2520):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/16022530/05_CR_GSU_Sports_Arena_new.jpg"
          alt="image"
        />
      </div>
      <div className="contentBox">
        <div className="formBx">
          <h2>Login</h2>
          <p>
            <strong>
              <ul>
                <li
                  style={{
                    display: isActive ? "none" : "inline-block",
                  }}
                >
                  {message}
                </li>
              </ul>
            </strong>
          </p>
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
                  type="button"
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

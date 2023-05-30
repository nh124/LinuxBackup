import React from "react";
import { useState } from "react";

function Register() {
  const [f_name, setF_name] = useState("");
  const [l_name, setL_name] = useState("");
  const [gsu_id, setGsu_id] = useState("");
  const [level, setLevel] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [primary_major, setPrimary_major] = useState("");
  const [alt_email, setAlt_email] = useState("");
  const [message, setMessage] = useState("");
  const [isActive, setIsActive] = useState(true);
  const authenticate = async () => {
    const data = {
      f_name,
      l_name,
      gsu_id,
      level,
      phone,
      password,
      primary_major,
      alt_email,
    };

    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    const statusErrors = {
      401: "User already exists, Please login",
      402: "Please enter the required fields!",
    };
    setIsActive(false);
    if (response.status in statusErrors) {
      setMessage(statusErrors[response.status]);
    }
    if (response.status === 200) {
      window.location.href = "/login";
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
          <h2>Register</h2>
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
              <span>First Name: </span>
              <input
                type="text"
                required
                onChange={(e) => setF_name(e.target.value)}
              ></input>
              <br />
              <br />
              <span>Last Name: </span>
              <input
                type="text"
                required
                onChange={(e) => setL_name(e.target.value)}
              ></input>

              <br />
              <br />

              <span>GSU ID: </span>
              <input
                type="text"
                required
                onChange={(e) => setGsu_id(e.target.value)}
              ></input>

              <br />
              <br />

              <span>Level: </span>
              <input
                type="text"
                required
                onChange={(e) => setLevel(e.target.value)}
              ></input>

              <br />
              <br />

              <span>Phone: </span>
              <input
                type="text"
                required
                onChange={(e) => setPhone(e.target.value)}
              ></input>

              <br />
              <br />

              <span>Primary Major: </span>
              <input
                type="text"
                required
                onChange={(e) => setPrimary_major(e.target.value)}
              ></input>

              <br />
              <br />

              <span>password: </span>
              <input
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              ></input>

              <br />
              <br />

              <span>Email: </span>
              <input
                type="text"
                required
                onChange={(e) => setAlt_email(e.target.value)}
              ></input>

              <br />
              <br />
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
                Dont have an account? <a href="/login">Login</a>
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

export default Register;

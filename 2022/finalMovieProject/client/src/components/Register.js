import React from "react";
import { useState, useEffect } from "react";

function Register() {
  const [f_name, setF_name] = useState("");
  const [l_name, setL_name] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [image, setImage] = useState("");
  const authenticate = async () => {
    const data = {
      f_name,
      l_name,
      username,
      email,
      phone,
      password,
    };

    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    // Integrate verify page.
    console.dir(response.status);
    if (response.status == 401) {
      console.log("Register unsuccessful");
    } else if (response.status == 200) {
      window.location.href = "/login";
    } else {
      console.log("Register unsuccessful");
    }
  };
  const getMovieImage = () => {
    fetch("/image").then((response) =>
      response.json().then((data) => {
        setImage(data);
      })
    );
  };
  useEffect(() => {
    getMovieImage();
  }, []);
  return (
    <section>
      <div class="imgBx">
        <img src={image} alt="image" />
      </div>
      <div class="contentBox">
        <div class="formBx">
          <h2>Register</h2>
          <form>
            <div class="inputBx">
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

              <span>Username: </span>
              <input
                type="text"
                required
                onChange={(e) => setUsername(e.target.value)}
              ></input>

              <br />
              <br />

              <span>Email: </span>
              <input
                type="text"
                required
                onChange={(e) => setEmail(e.target.value)}
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

              <span>password: </span>
              <input
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              ></input>

              <br />
              <br />

              <br />
              <br />
            </div>

            <div class="signin">
              <label>
                <input
                  type="submit"
                  value="Sign in"
                  onClick={() => authenticate()}
                />
              </label>
            </div>
            <div class="signUp">
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

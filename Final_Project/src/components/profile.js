import { React, useState, useEffect } from "react";

import "./styles/loginStyle.css";

function Profile() {
  const [userData, setUserData] = useState({});
  const [message, setMessage] = useState("");
  const [isActiveF_Name, setIsActiveF_Name] = useState(true);
  const [isActiveL_Name, setIsActiveL_Name] = useState(true);
  const [isActiveEmail, setIsActiveEmail] = useState(true);
  const [isActiveLevel, setIsActiveLevel] = useState(true);
  const [isActivePhone, setIsActivePhone] = useState(true);
  const [isActiveP_Major, setIsActiveP_Major] = useState(true);
  const authenticate = async () => {
    fetch("/getAllUserDetails").then((responce) =>
      responce.json().then((data) => {
        setUserData(data[0]);
        console.log(data);
      })
    );
  };
  useEffect(() => {
    authenticate();
  }, []);

  const showBoxFName = () => {
    setIsActiveF_Name(!isActiveF_Name);
  };
  const showBoxLName = () => {
    setIsActiveL_Name(!isActiveL_Name);
  };
  const showBoxLevel = () => {
    setIsActiveLevel(!isActiveLevel);
  };
  const showBoxEmail = () => {
    setIsActiveEmail(!isActiveEmail);
  };
  const showBoxPhone = () => {
    setIsActivePhone(!isActivePhone);
  };
  const showBoxMajor = () => {
    setIsActiveP_Major(!isActiveP_Major);
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
          <h2>Profle Settings</h2>
          <p>
            <strong>
              <ul>
                <li>{message}</li>
              </ul>
            </strong>
          </p>
          <form>
            <div className="inputBx">
              <span>First name: {userData.first_name}</span>
              <input
                style={{
                  display: isActiveF_Name == true ? "none" : "inline-block",
                }}
                type="text"
                required
              ></input>
              <input type="button" value="update" onClick={showBoxFName} />
            </div>

            <div className="inputBx">
              <span>Last name: {userData.last_name}</span>
              <input
                style={{
                  display: isActiveL_Name == true ? "none" : "inline-block",
                }}
                type="text"
                required
              ></input>
              <input type="button" value="update" onClick={showBoxLName} />
            </div>
            <div className="inputBx">
              <span> Email: {userData.alt_email}</span>
              <input
                style={{
                  display: isActiveEmail == true ? "none" : "inline-block",
                }}
                type="text"
                required
              ></input>
              <input type="button" value="update" onClick={showBoxEmail} />
            </div>
            <div className="inputBx">
              <span>Year: {userData.level}</span>
              <input
                style={{
                  display: isActiveLevel == true ? "none" : "inline-block",
                }}
                type="text"
                required
              ></input>
              <input type="button" value="update" onClick={showBoxLevel} />
            </div>
            <div className="inputBx">
              <span>Major: {userData.primary_major}</span>
              <input
                style={{
                  display: isActiveP_Major == true ? "none" : "inline-block",
                }}
                type="text"
                required
              ></input>
              <input type="button" value="update" onClick={showBoxMajor} />
            </div>
            <div className="inputBx">
              <span>Phone: {userData.phone_number}</span>
              <input
                style={{
                  display: isActivePhone == true ? "none" : "inline-block",
                }}
                type="text"
                required
              ></input>
              <input type="button" value="update" onClick={showBoxPhone} />
            </div>
            <div className="signin">
              <label>
                <input type="button" value="Sign in" />
              </label>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Profile;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function AddUser() {
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [username, setUsername] = useState([]);
  const navigate = useNavigate();
  const AddUser = async () => {
    await axios({
      method: "post",
      url: "http://localhost:8080/user",
      data: {
        email: email,
        name: name,
        username: username,
      },
    });
    navigate("/");
  };
  const navigateHome = () => {
    navigate("/");
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register User</h2>
          <div className="mb-3">
            <label htmlFor="Name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter you name"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter you Username"
              name="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter you email"
              name="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-outline-primary"
            onClick={AddUser}
          >
            Submit
          </button>
          <button
            type="submit"
            className="btn btn-outline-danger mx-2"
            onClick={navigateHome}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

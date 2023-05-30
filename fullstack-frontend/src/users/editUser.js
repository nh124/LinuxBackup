import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function AddUser() {
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [username, setUsername] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const EditUser = async () => {
    await axios({
      method: "put",
      url: `http://localhost:8080/user/${id}`,
      data: {
        email: email,
        name: name,
        username: username,
      },
    });
    navigate("/");
  };
  useEffect(() => {
    loadUsers();
  }, []);
  const loadUsers = async () => {
    const result = await axios.get(`http://localhost:8080/user/${id}`);
    setName(result.data.name);
    setEmail(result.data.email);
    setUsername(result.data.username);
    console.log(result.data.name);
  };
  const navigateHome = () => {
    navigate("/");
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>
          <div className="mb-3">
            <label htmlFor="Name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter you name"
              name="name"
              value={name}
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
              value={username}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-outline-primary"
            onClick={EditUser}
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

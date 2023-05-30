import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
export default function ViewUser() {
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [username, setUsername] = useState([]);
  const { id } = useParams();
  const loadUsers = async () => {
    const result = await axios.get(`http://localhost:8080/user/${id}`);
    setName(result.data.name);
    setEmail(result.data.email);
    setUsername(result.data.username);
  };
  useEffect(() => {
    loadUsers();
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Detailes</h2>
          <div className="card">
            <div className="card-holder">
              Detailes of user id: {id}
              <ul className="list-group list-group-flash">
                <li className="list-group-item">
                  <b>Name: {name}</b>
                </li>
                <li className="list-group-item">
                  <b>Email: {email}</b>
                </li>
                <li className="list-group-item">
                  <b>UserName: {username}</b>
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

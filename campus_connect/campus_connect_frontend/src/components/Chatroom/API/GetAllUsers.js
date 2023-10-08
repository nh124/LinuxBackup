import axios from "axios";

const auth_token = localStorage.getItem("auth_token");
const endpoint = process.env.REACT_APP_SERVICE_URI;

export function getAllUsers() {
  try {
    const promise = axios.get(endpoint + "/api/v1/access-point/getUsers", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth_token}`,
      },
    });
    const dataPromise = promise.then((response) => response.data);
    return dataPromise;
  } catch (error) {
    window.location.href = "/login";
  }
}

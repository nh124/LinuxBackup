import axios from "axios";
const auth_token = localStorage.getItem("auth_token");

export function userDetails() {
  try {
    const promise = axios.get(
      `http://localhost:8080/api/v1/access-point/user`,
      {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      }
    );
    const dataPromise = promise.then((response) => response.data);
    return dataPromise;
  } catch (error) {
    console.log(error);
  }
}

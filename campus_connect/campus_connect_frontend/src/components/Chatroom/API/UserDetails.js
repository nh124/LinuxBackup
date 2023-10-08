import axios from "axios";
const auth_token = localStorage.getItem("auth_token");
const endpoint = process.env.REACT_APP_SERVICE_URI;

export function userDetails() {
  try {
    const promise = axios.get(
      endpoint + `/api/v1/access-point/user`,
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

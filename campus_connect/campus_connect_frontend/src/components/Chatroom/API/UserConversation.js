import axios from "axios";

// export let PublicMessages = [];
const auth_token = localStorage.getItem("auth_token");

export function UserConversations() {
  try {
    const promise = axios.get(
      `http://localhost:8080/api/v1/access-point/chat/getAllChats`,
      {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      }
    );
    const dataPromise = promise.then((response) => response.data);
    return dataPromise;
  } catch (error) {
    window.location.href = "/login";
  }
}

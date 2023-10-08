import axios from "axios";
const auth_token = localStorage.getItem("auth_token");
export let messages = [];
const endpoint = process.env.REACT_APP_SERVICE_URI;

axios
  .get(endpoint + `/api/v1/access-point/chat/getAllChats`, {
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  })
  .then((response) => {
    let conversation = response.data;
    for (let element of conversation) {
      if (element.type === "PUBLIC") {
        let message = {
          message: element.message,
          receiver: element.receiver,
          type: element.type,
          sender: element.user.id,
        };
        messages.push(message);
      }
    }
  })
  .catch((error) => {
    console.log(error);
  });

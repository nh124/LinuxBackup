import axios from "axios";
const auth_token = localStorage.getItem("auth_token");
export let messages = [];

axios
  .get(`http://localhost:8080/api/v1/access-point/chat/getAllChats`, {
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

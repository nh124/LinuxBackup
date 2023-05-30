let stompClient = null;

$(document).ready(function() {
    console.log("Index page is ready");
    connect();
    $("#send").click(function() {
        sendMessage();
    });
});

function showMessage(message) {
//    $("#messages").append("<tr><td>" + message + "</td></tr>");
    console.log(message)
}

function connect() {
    var socket = new SockJS('/our-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, (frame) => {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/messages', (message) => {
//            showMessage(JSON.parse(message.body).content);
              showMessage(message);
        });
    })
}

function sendMessage() {
    console.log("sending message");
    stompClient.send("/ws/message", {}, JSON.stringify({'messageContent': $("#message").val()}));
}
let mess = document.querySelector("#messages");
console.log(mess)
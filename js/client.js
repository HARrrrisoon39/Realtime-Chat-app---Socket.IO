var socket = io.connect("http://localhost:3000");

const messageContainer = document.querySelector(".container");
const messageLeft = document.querySelector(".container");
const form = document.getElementById("send-container");
const input = document.getElementById("messageInp");
var audio = new Audio("ting.mp3");

const append = (message, postion) => {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = message;
  messageElement.classList.add("message");
  messageElement.classList.add(postion);
  messageContainer.append(messageElement);
  audio.volume = 0.2;
  audio.play();
};

const leftChatAppend = (leftMsg) => {
  const leftMsgElement = document.createElement("div");
  leftMsgElement.innerHTML = leftMsg;
  leftMsgElement.classList.add("leftChat");
  messageLeft.append(leftMsgElement);
  audio.volume = 0.2;
  audio.play();
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = input.value;
  append(`You:${message}`, "right");
  socket.emit("send", message);
  input.value = "";
});

const name = prompt("enter the name ");
if (name != null) {
  document.getElementById("demo").innerHTML = name;
}
socket.emit("new-user-joined", name);

socket.on("user-joined", (name) => {
  append(`${name}:joined the chat`, "right");
});
socket.on("receive", (data) => {
  append(`${data.name}:${data.message}`, "left");
});

socket.on("leave", (name) => {
  leftChatAppend(`${name}:Left the chat`);
});

let messages = [];
const socket = io("http://localhost:3000", {
  auth: {
    token: "auth token",
  },
  query: {
    token: "query token",
  },
});

socket.on("connect", () => {
  console.log("Connected index.js");
});

socket.on("client-chat", (data) => {
  //   console.log("Client Data: ", data);
  const { user, roomName, time, message: msg } = data;
  const message = `
  <div class=${username === user.username ? "outgoing-chats" : "received-chats"}>
       <div class=${username === user.username ? "outgoing-chats-img" : "received-chats-img"}>
            <img src=${username === user.username ? "user1.png" : "user2.png"} />
        </div>
        <div class=${username === user.username ? "outgoing-msg" : "received-msg"}>
          <div class=${username === user.username ? "outgoing-chats-msg" : "received-chats-msg"}>
            <p class="multi-msg">${msg}</p>
    <span class="time">${time}</span>
          </div >
        </div >
    </div >
    `;
  messages.push(message);
  document.getElementById("msg-page").innerHTML = messages.join("");
});

const roomName = prompt("enter roomName: ", "mamdbas");
const username = prompt("enter your name: ", "reza");
// const msgInput = document.querySelector("#msg-input");
const msgInput = document.getElementById("msg-input");
const sendBtn = document.getElementById("send-btn");
const usernameTag = document.getElementById("username");
// const sendBtn = document.querySelector("#send-btn");
// const usernameTag = document.querySelector("#username");

sendBtn.addEventListener("click", () => {
  usernameTag.innerHTML = username;
  const message = msgInput.value;
  if (roomName && username) {
    socket.emit("join_room", {
      roomName,
      user: {
        username,
        socketId: socket.id,
      },
    });
    socket.emit("server-chat", {
      message,
      roomName,
      user: {
        username,
        socketId: socket.id,
      },
      time: new Date().toISOString(),
    });
  } else {
    alert("please enter the data");
  }
});

socket.on("exception", (data) => {
  console.log(data);
});

socket.on("disconnect", () => {
  console.log("Disconnected");
});

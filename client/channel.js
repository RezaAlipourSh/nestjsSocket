const channel = io("http://localhost:3000/channel");
channel.on("connect", () => {
  console.log("connected");
  channel.emit("list", { message: "send channel list" });
  channel.on("list", (data) => {
    console.log("channel List: ", data);
  });
});

const group = io("http://localhost:3000/group");
group.on("connect", () => {
  group.emit("list", { message: "Send group List" });
  group.on("list", (data) => {
    console.log("group List: ", data);
  });
});

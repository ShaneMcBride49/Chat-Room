const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = 4001;

const app = express();

const server = http.createServer(app);

const io = socketIo(server); // < Interesting!
let interval;
let messageList = [];
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("updateMessages", (messages) => {
    console.log("Hello World!");
    messageList = messages;
    //messageList = messageList.concat(messages);
    socket.broadcast.emit("updateMessages", messageList);
  });
  socket.on("getMessages", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
server.listen(port, () => console.log(`Listening on port ${port}`));

const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("\x1b[32m", `${socket.id} connected`, "\x1b[37m");

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(
      "\x1b[34m",
      `User with ID: ${socket.id} joined room: ${data}`,
      "\x1b[37m"
    );
  });

  socket.on("send_message", (data) => {
    console.log(
      "\x1b[33m",
      `${data.author} in room ${data.room} sent: ${data.message} (${data.time})`,
      "\x1b[37m"
    );
    // console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("\x1b[31m", `${socket.id} left`, "\x1b[37m");
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});

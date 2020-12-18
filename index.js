const express = require('express');
const socket = require("socket.io");
const app = express();


app.use(express.static("public"));

var server = app.listen(4000, function () {
  console.log("Server is running on port 4000");
});

let io = socket(server);

io.on("connection", function (socket) {
  console.log("User Connected :" + socket.id);

  socket.on("join", function (roomName) {
    var rooms = io.sockets.adapter.rooms;
    var room = rooms.get(roomName);

    if (room == undefined) {
      socket.join(roomName);
      socket.emit("created");
      console.log("Room Created");

    } else if (room.size == 1) {
      socket.join(roomName);
      socket.emit("joined");
      console.log("Room Joined");

    } else {
      socket.emit("full");
      console.log("Room full for now");

    }
    console.log(rooms);

  });

  socket.on("ready", function (roomName) {
    console.log("ready");
    socket.broadcast.to(roomName).emit("ready");
  })

  socket.on("candidate", function (candidate, roomName) {
    console.log();
    socket.broadcast.to(roomName).emit("candidate", candidate);
  })

  socket.on("offer", function (offer, roomName) {
    socket.broadcast.to(roomName).emit("offer", offer);
  })

  socket.on("answer", function (answer, roomName) {
    socket.broadcast.to(roomName).emit("answer", answer);
  })


})
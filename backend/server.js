// backend/server.js
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Routes
app.get("/", (req, res) => {
  res.send("Video Calling App Backend");
});

// WebRTC signaling
io.on("connection", (socket) => {
  console.log("New client connected");

  // Signaling events
  socket.on("offer", (data) => {
    socket.to(data.target).emit("offer", data);
  });

  socket.on("answer", (data) => {
    socket.to(data.target).emit("answer", data);
  });

  socket.on("ice-candidate", (data) => {
    socket.to(data.target).emit("ice-candidate", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

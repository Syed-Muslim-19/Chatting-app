const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require("path");
const PATH = path.join(__dirname, "../frontend");
//necassey files
app.use(express.static(PATH));
app.use(express.urlencoded({ extended: false }));

//routers
app.get("/", (req, res) => {
  res.sendFile(path.join(PATH, "index.html"));
});

//socket
const io = require("socket.io")(http);
io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});

//listening
http.listen(process.env.PORT || 8080, () => {
  console.log("Server Connecting...");
});

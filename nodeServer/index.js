// const io = require("socket.io")(3000);
const io = require("socket.io")(3000, {
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
const users = {};

io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    console.log("new user", name);
    // console.log("connected");
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });
  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("leave", users[socket.id]);
    delete users[socket.id];
  });
});

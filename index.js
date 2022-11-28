const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

const io = socket(server, {
  cors: {
    origin:
      "https://638471df1f565929c7878c7f--meek-profiterole-37e564.netlify.app/",
    credentials: true,
  },
});
var clients = {};

io.on('connection',(socket)=>{
  console.log("connected");
  console.log(socket.id,"has joined");
  socket.on("/test",(msg)=>{
    console.log(msg);
    clients[id] = socket;
    console.log(clients);
  });
  socket.on("send-msg", (msg) => {
    console.log(msg);
    let targetId= msg.targetId;
    if (clients[targetId]) clients[targetId].emit("msg-recieve", msg);
  });
});


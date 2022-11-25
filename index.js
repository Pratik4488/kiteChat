const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path');
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();
const socket = require("socket.io");
require("dotenv").config();
const multer = require("multer");
const crypto = require('crypto');
const {GridFsStorage} = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride=require('method-override');


app.use(cors());
app.use(express.json());
app.use(methodOverride('_method'));

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

const conn=mongoose.createConnection(process.env.MONGO_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});
let gfs;

conn.once('open',()=>{
  gfs=new mongoose.mongo.GridFSBucket(conn.db,{
    bucketName: "uploads"
  });
});

const storage = new GridFsStorage({
  url: process.env.MONGO_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });
app.post('/upload', upload.single('file'), (req, res) => {
   console.log(res.json({ file: req.file }));
    res.send("done");
});


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});

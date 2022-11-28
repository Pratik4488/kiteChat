const express = require("express");
var http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path');
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();

var server = http.createServer(app)
var io = require("socket.io")(server);

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




 server.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

// socket.on("send-msg", (data) => {
//   const sendUserSocket = onlineUsers.get(data.to);
//   if (sendUserSocket) {
//     socket.to(sendUserSocket).emit("msg-recieve", data.msg);
//   }
// });


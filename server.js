const express = require("express");
const mongoose = require("mongoose");

const server = express();

server.use(
  express.urlencoded({
    urlencoded: false
  })
);
server.use(express.json());

// // 响应静态资源
server.use("/static/js", express.static("./www/static/js"));
server.use("/static/css", express.static("./www/static/css"));
// server.use("/img", express.static("./www/img"));
server.get("/favicon.ico", (req, res) => {
  res.sendFile(__dirname + "/www/favicon.ico");
});


server.all("*", function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// 响应首页

server.use("/api/user", require("./routers/userRouter"));

server.use("/api/friend", require("./routers/friendRouter"));

server.use("/api/message", require("./routers/messageRouter"));



server.use("/",(req, res) => {
  // console.log("未匹配")
  // console.log(res.url);
  res.header("Content-Type", "text/html");
  res.sendFile(__dirname + "/www/index.html");
});

// 连接数据库
mongoose.connect(
  "mongodb://localhost:27017/db",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  error => {
    if (error) {
      console.log("连接数据库失败：");
      console.log(error);
    } else {

      // 启动服务器
      const WebSocket = require("ws");

      const wsServer = new WebSocket.Server({
        port: 3000
      });

      wsServer.on("connection", require("./handleMessage"));

      console.log("连接数据成功");
      // 启动成功
      server.listen("9000", error => {
        if (!error) {
          console.log("服务器启动成功");
        } else {
          console.log("服务器启动失败：");
          console.log(error);
        }
      });
    }
  }
);

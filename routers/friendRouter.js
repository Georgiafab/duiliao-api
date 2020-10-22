const express = require("express");
const Friend = require("../model/friend");
var cookieParser = require('cookie-parser'); 
const server = express();
const router = new express.Router();

server.use(cookieParser());  

//添加好友
router.post("/addfriend", async (req, res) => {
  let _id=req.headers.cookie.split("=")[1];
  // req.headers.cookie.split(';');
  try {
    let result = await Friend.add(
      _id,
      req.body.friend_id
    );
    res.json({
      code: 0,
      message: "ok"
    });
  } catch (error) {
    res.json({
      code: -1,
      message: error.message
    });
  }
});

// 请求好友列表
router.get("/find_friend_by_user", async (req, res) => {
  let _id=req.headers.cookie.split("=")[1];
  console.log(_id);
  try {
    let result = await Friend.find(_id);
    res.json({
      code: 0,
      message: "ok",
      data: result
    });
  } catch (error) {
    res.json({
      code: -1,
      message: error.message
    });
  }
});


// 判断是否为好友
router.post("/isfriend", async (req, res) => {
  let _id=req.headers.cookie.split("=")[1];
  try {
    let result = await Friend.isfriend(_id,req.body.friend_id);
    res.json({
      code: 0,
      message: "ok",
      data: result
    });
  } catch (error) {
    res.json({
      code: -1,
      message: error.message
    });
  }
});





module.exports = router;

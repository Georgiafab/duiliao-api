const express = require("express");
const Message = require("../model/message");
const router = new express.Router();

//开始聊天，请求聊天记录
router.post("/start_chat",async (req, res) => {
  let _id=req.headers.cookie.split("=")[1];
    
  try {
    let result = await Message.find(
      req.body._id,
      req.body.friend_id
    );
    res.json({
      code: 0,
      message: "ok",
      data:result
    });
  } catch (error) {
    res.json({
      code: -1,
      message: error.message
    });
  }
});

//结束聊天，保存聊天记录
router.post("/end_chat", async (req, res) => {
  // let _id=req.headers.cookie.split("=")[1];
  console.log(req.body);
  try {

    let result = await Message.addMessage(
      req.body._id,
      req.body.friend_id,
      req.body.gulp,
      req.body.message
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



//获取聊天记录列表
router.get("/messgae_list", async (req, res) => {
  let _id=req.headers.cookie.split("=")[1];
  try {
    let result = await Message.findLast(
      _id
    ); 
    res.json({
      code: 0,
      message: "ok",
      data:result
    });
  } catch (error) {
    res.json({
      code: -1,
      message: error.message
    });
  }
});

module.exports = router;

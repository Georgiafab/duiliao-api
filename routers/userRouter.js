const express = require('express');
const User = require('../model/user');
const router = new express.Router();




// req.headers.cookie

//登录
router.post('/login', (req, res) => {
    const {
      name,
      pass
    } = req.body;
    User.findByTel(name)
        .then(result => {
            if (result) {
                res.json({
                    code: 0,
                    message: '登录成功',
                    data:result
                });
            } else {
                res.json({
                    code: -1,
                    message: '该账号不存在'
                });
            }
        })
});

// 注册
router.post('/regiester', (req, res) => {
    // console.log(req.body);
    const {
        name,
        pass,
        id,
        sn
    } = req.body;
    User.add(name,
        pass,
        id,
        sn)
        .then((userInfo) => {
            res.json({
                code: 0,
                message: 'ok'
            })
        })
        .catch((error) => {
            res.json({
                code: -1,
                message: error.message
            })
        })
});

//关键字搜索好友列表
router.post("/find_friend_by_key", async (req, res) => {
    console.log(req.body);
    try {
      let result = await User.findByKey(req.body.key);
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

  //id获取好友详细信息
router.get("/find_friend_by__id", async (req, res) => {
    // console.log(req.query._id);
    try {
      let result = await User.findBy_ID(req.query._id);
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
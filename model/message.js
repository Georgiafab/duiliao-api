const mongoose = require("mongoose");

const Message = mongoose.model(
  "message",
  new mongoose.Schema({
    user: {
      type: String,
      required: true
    },
    friend_id: {
      type: String,
      required: true
    },
    gulp: {
      type: String,
      required: true
    },
    message: {
      type: Array
    }
  })
);

// // 添加聊天记录
// module.exports.addMessage = async (_id, friend_id, message) => {
//   let mewMess = new Message({
//     user: _id,
//     friend_id,
//     message
//   });

//   return await mewMess.save();
// };

// 添加聊天记录
module.exports.addMessage = (_id, friend_id, gulp, mess) => {
  console.log(gulp);
  mess = JSON.parse(mess);
  Message.find({ gulp: gulp }).then(res => {

    if (res.length !== 0) {
      console.log("有数据执行");
      console.log(res[0]);
      let obj=res[0];
      let newMessage = [...obj.message, ...mess];
      console.log(newMessage);
      Message.update(
        { gulp: gulp },
        { message: newMessage }).then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      let mewMess = new Message({
        user: _id,
        friend_id,
        gulp,
        message:mess
      });
      return mewMess
        .save()
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }).catch((error)=>{
    console.log(error);
  });
};

function compare(key) {
  // 根据key值排序
  return function(value1, value2) {
    var val1 = value1[key];
    var val2 = value2[key];
    return val1 - val2;
  };
}

function compare2(key) {
  return function(value1, value2) {
    var val1 = value1[key];
    var val2 = value2[key];
    return val2 - val1;
  };
}

//查找某用户与好友的聊天记录
module.exports.find = async (_id, friend_id) => {
  const result2 = await Message.find({ user: friend_id, friend_id: _id });
  const result = await Message.find({ user: _id, friend_id: friend_id });

  // console.log(result)
  //对两边的聊天信息进行整合
  let arr = [];
  result.map(item => {
    arr = [...arr, ...item.message];
  });
  result2.map(mess => {
    arr = [...arr, ...mess.message];
  });

  arr.sort(compare("time"));

  return arr;
};

//查找信息列表

module.exports.findLast = async _id => {
  const result = await Message.find({ gulp: { $regex: _id } });

  let arr=[];
  result.forEach(item=>{
    arr.push(item.message[item.message.length-1]);
  })

  return arr;
};

 
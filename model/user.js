const mongoose = require('mongoose');

const User = mongoose.model('user', new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  pass: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  sn: {
    type: String,
    required: true
  }
}));

module.exports.add = async (name, pass,id,sn) => {
  const result = await User.findOne({
    name
  });
  if (result) {
    throw new Error('该用户昵称已存在');
  } else {
    const user = new User({
      name,
      pass,
      id,
      sn
    });
    return await user.save();
  }
}

// 查询
module.exports.findByTel = async (name) => {
  return await User.findOne({
    name
  });
}

// 关键字搜索好友
module.exports.findByKey = async (key)=>{
  return await User.find({"name": {"$regex":key}});
}

// _id搜索好友
module.exports.findBy_ID = async (_id)=>{
  return await User.findOne({
    _id
  });
}
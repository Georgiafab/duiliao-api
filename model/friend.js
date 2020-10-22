const mongoose = require("mongoose");


const Friend = mongoose.model("friend",new mongoose.Schema({
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user"
    },
    friend_id: {
      type: String,
      required: true
    }
  })
);


// 添加好友
module.exports.add = async (_id,friend_id)=>{
    let friend=new Friend({
        user:_id,
        friend_id
    });
      let friend2=new Friend({
        user:friend_id,
        friend_id:_id
    });

    const result=await friend2.save();
    return await friend.save();
}



module.exports.find = async (userid)=>{
    return await Friend.find({user: userid});
}



module.exports.isfriend = async (userid,friend_id)=>{
  return await Friend.find({user: userid,friend_id:friend_id});
}

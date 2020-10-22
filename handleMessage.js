// const Message =require('./model/message');

// 多人聊天
// let map =
//   {
//     //  username: socket,
//     //  username: socket
//   };

let map = [
  // {},
  // {}
];

module.exports = socket => {
  console.log("有人上线了");

  socket.on("close", () => {   //  下线删除掉对应的socket对象
    for (let i = 0; i < map.length; i++) {
      for (let user in map[i]) {
        let value = map[user];
        if (value === socket) {
          console.log(`${user}下线了`);
          delete map[user];
        }
      }
    }
  });

  socket.on("message", data => {
    let { type, gulp, sendId } = JSON.parse(data);

    gulp = gulp.split(",");

    if (type === 1) {
      //一对一聊天

      let newGlup = {};

      gulp.forEach(item => {
        newGlup[item] = "";
      });
      newGlup[sendId] = socket;

      // console.log(newGlup);
      //查找聊天组是否存在
      let has = -1;

      for (let j = 0; j < map.length; j++) {
        for (let i = 0; i < gulp.length; i++) {
          has = j;
          if (Object.keys(map[j]).indexOf(gulp[i]) === -1) {
            has = -1;
          }
          // console.log(has);
        }
      }

      console.log(has);

      if (has < 0) {
        map.push(newGlup);
      } else {
        let index = has;
        map[index][sendId] = socket;

        for (let i = 0; i < gulp.length; i++) {
          if (map[index][gulp[i]] === "") {
          } else {
            console.log(map);
            Object.entries(map[index]).forEach(([user, sk]) => {
              if (sk !== "") {
                if (socket !== sk) {
                  console.log(sk);
                  // 将信息告诉其他人
                  sk.send(data);
                } else {
                  //本人
                  sk.send(JSON.stringify({ status: "ok" }));
                }
              }
            });
          }
        }
      }
    } else if (type === 0) {
      //群聊
    }
  });
};

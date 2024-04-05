const fetch = require("node-fetch");
const Task = require("./task");
let _messages = [];
let _user = null;
let { data, incSended, incReceived } = require("./shared");

async function startLoop(bot) {
  // 执行发送任务
  setInterval(function () {
    (async () => {
      try {
        let res = await fetch(data.get("host") + "/api/task");
        let { task } = res.json();
        await Task.send(bot, task);
      } catch (error) {
        console.log(error);
      }
    })();
  }, 1200);

  // 上传消息
  setInterval(function () {
    (async () => {
      try {
        if (_messages.length > 0) {
          let __messages = [...messages];
          _messages = [];
          await fetch(data.get("host") + "/api/messages", {
            method: "POST",
            data: JSON.stringify({
              message: __messages,
            }),
          });

          incReceived(__messages.length);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, 2000);
}

module.export = {
  load: async (bot) => {
    bot.on("login", async (user) => {
      _user = user;
      await startLoop(bot);
    });

    bot.on("message", async (msg) => {
      // 文本消息不做处理
      if (msg.type() !== bot.Message.Type.Text) {
        return;
      }

      let text = msg.text();
      if (text == "ping") {
        msg.say("pinging");
      }

      let from = msg.talker();
      let to = msg.listener();
      let room = msg.room();
      _messages.push({
        wid: _user.id,
        text: text,
        roomid: room?.id,
        toid: to?.id,
        fromid: from?.id,
        date: msg.date(),
      });
    });
  },
};

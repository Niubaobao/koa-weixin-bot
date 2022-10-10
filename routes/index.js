const router = require("koa-router")(); // 引入实例化路由
const { log, ScanStatus, WechatyBuilder } = require("wechaty");
const qrTerm = require("qrcode-terminal");
const { PuppetPadlocal } = require("wechaty-puppet-padlocal");
const LOGPRE = "[PadLocalDemo]";
const token = "ba29553a47f9470bb839672717a62385"; // 登录微信的token

const puppet = new PuppetPadlocal({
  token,
});
const bot = WechatyBuilder.build({
  name: "weixinbot",
  puppet,
})
  .on("scan", (qrcode, status) => {
    if (status === ScanStatus.Waiting && qrcode) {
      qrTerm.generate(qrcode, { small: true }); // show qrcode on console
      const qrcodeImageUrl = [
        "https://wechaty.js.org/qrcode/",
        encodeURIComponent(qrcode),
      ].join("");

      log.info(LOGPRE, `onScan: ${ScanStatus[status]}(${status})`);

      console.log(
        "\n=================================================================="
      );

      require("qrcode-terminal").generate(qrcode, { small: true }); // show qrcode on console

      console.log(`\n2. Or open the link in your browser: ${qrcodeImageUrl}`);
      console.log(
        "\n==================================================================\n"
      );
    } else {
      log.info(LOGPRE, `onScan: ${ScanStatus[status]}(${status})`);
    }
  })
  .on("login", (user) => {
    log.info(LOGPRE, `${user} login`);
  })
  .on("logout", (user, reason) => {
    log.info(LOGPRE, `${user} logout, reason: ${reason}`);
  })
  .on("message", async (message) => {
    // const room = await bot.Room.find({ topic: "要哇塞哦" });

    log.info(LOGPRE, `on message: ${message.toString()}`);

    // await getMessagePayload(message);

    // await dingDongBot(message);
  })
  .on("room-invite", async (roomInvitation) => {
    log.info(LOGPRE, `on room-invite: ${roomInvitation}`);
  })
  .on("room-join", (room, inviteeList, inviter, date) => {
    log.info(
      LOGPRE,
      `on room-join, room:${room}, inviteeList:${inviteeList}, inviter:${inviter}, date:${date}`
    );
  })
  .on("room-leave", (room, leaverList, remover, date) => {
    log.info(
      LOGPRE,
      `on room-leave, room:${room}, leaverList:${leaverList}, remover:${remover}, date:${date}`
    );
  })
  .on("room-topic", (room, newTopic, oldTopic, changer, date) => {
    log.info(
      LOGPRE,
      `on room-topic, room:${room}, newTopic:${newTopic}, oldTopic:${oldTopic}, changer:${changer}, date:${date}`
    );
  })
  .on("friendship", (friendship) => {
    log.info(LOGPRE, `on friendship: ${friendship}`);
  })
  .on("error", (error) => {
    log.error(LOGPRE, `on error: ${error}`);
  });
bot.start().then(() => {
  log.info(LOGPRE, "started.");
});

router.post("/sendMessage", async (ctx, next) => {
  console.log(ctx.request.body);
  const room = await bot.Room.find({ topic: "要哇塞哦" });
  console.log(room);
  const { message } = ctx.request.body;
  if (room) {
    await room.say(`weixinbot:${message}`);
  }

  ctx.body = message;
});

module.exports = router;

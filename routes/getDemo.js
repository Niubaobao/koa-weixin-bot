const router = require("koa-router")();

router.get("/get", (ctx) => {
  let request = ctx.request.query; //获取get请求参数
  console.log(request);
  ctx.body = request;
});

module.exports = router;

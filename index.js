const koa = require("koa");
const json = require("koa-json");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const onerror = require("koa-onerror");
const app = new koa();
const index = require("./routes/index");

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());

// routes
app.use(index.routes(), index.allowedMethods());

/*
 * router.allowedMethods()作用： 这是官方文档的推荐用法,我们可以
 * 看到 router.allowedMethods()用在了路由匹配 router.routes()之后,所以在当所有
 * 路由中间件最后调用.此时根据 ctx.status 设置 response 响应头
 *
 */

app.listen(3000, "0.0.0.0", () => {
  console.log("Server is starting");
});

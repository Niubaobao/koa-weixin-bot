const koa = require("koa");
const json = require("koa-json");
// 对于 post 请求的处理，可以把 koa 上下文的 formData 数据解析到 ctx.request.body 中
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const onerror = require("koa-onerror");
const app = new koa();
// 引入子路由
const index = require("./routes/index");
const getDemo = require("./routes/getDemo");
// 静态资源
const static = require("koa-static");
const path = require("path");

// error handler
onerror(app);

// 静态资源相对于 index.js 的路径
const staticPath = "./static";

app.use(static(path.join(__dirname, staticPath)));

// 使用 ctx.request.body 解析中间件
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());

// 加载路由中间件
app.use(index.routes(), index.allowedMethods());
app.use(getDemo.routes(), getDemo.allowedMethods());

/*
 * router.allowedMethods()作用： 这是官方文档的推荐用法,我们可以
 * 看到 router.allowedMethods()用在了路由匹配 router.routes()之后,所以在当所有
 * 路由中间件最后调用.此时根据 ctx.status 设置 response 响应头
 *
 */

app.listen(3000, "0.0.0.0", () => {
  console.log("Server is starting");
});

import Koa from "koa";
import koaBody from "koa-body";
import bodyparser from "koa-bodyparser";
import check from "./utils/check";
import controller from "./controller";
const app = new Koa();

app.use(
  koaBody({
    multipart: true,
  })
);
app.use(bodyparser());
app.use(async (ctx, next) => {
  const contentType = "application/json; charset=utf-8";
  ctx.set("Content-Type", contentType);
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  console.log(`${ctx.request.method} ${ctx.request.url}`);
  await next();
});

app.use(async (_ctx, next) => {
  const start = new Date().getTime();
  await next();
  const ms = new Date().getTime() - start;
  console.log(`耗时: ${ms}ms`);
});
app.use(check);

app.use(controller());

// 端口
const PORT = 5000;

app.listen(PORT, function () {
  console.log(`Server is listening ${PORT}，http://localhost:${PORT}`);
});

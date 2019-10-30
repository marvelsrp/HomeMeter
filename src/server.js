const fs = require('fs');
const koa = require('koa');
const koaBodyParser = require('koa-bodyparser');
const koaJSON = require('koa-json');
const koaLog = require('koa-log');
const withMeters = require('./middlewares/withMeters');
const importModule = require('./utils/importModule');
const { initRoutes } = require('core/router');
const app = new koa();

app.use(withMeters(app));
app.use(koaLog('dev'));
app.use(
  koaBodyParser({
    onerror: function(err, ctx) {
      ctx.throw('Body parse error', 422);
    },
  })
);
app.use(koaJSON());

fs.readdirSync('./src/routes').forEach(importModule);

const router = initRoutes();

app.use(router.allowedMethods());
app.use(router.routes());

app
  .listen(process.env.PORT, function() {
    console.log(`Listening at port ${process.env.PORT}`);
  })
  .setTimeout(300000);

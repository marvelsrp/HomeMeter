const { registerRoute } = require('core/router');

registerRoute(
  'GET /',
  async ctx => {

    return JSON.stringify(ctx.app.meters, null, 2);
  }
);

registerRoute(
  'GET /123',
  async ctx => {
    return JSON.stringify(ctx.env, null, 2);
  }
);

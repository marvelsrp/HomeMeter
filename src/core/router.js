const KoaRouter = require('koa-router');

const koaRouter = new KoaRouter();
const store = [];

const registerRoute = (template, callback) => {
  const [method, url] = template.split(' ');
  const routeMethod = method.toLowerCase();
  console.log('registerRoute', method, url);
  store.push({
    id: store.length,
    method: routeMethod,
    url: url,
    route: async ctx => {

      ctx.body = await callback(ctx);
      ctx.status = 200;
    },
  });
};

/**
 * Register by priority in koa
 *
 * @Example:
 * routeWithoutParams: /screen/grid,
 * routeWithParamsWithoutConflit: /screen/:id/approve-action
 * routeWithParamsWithConflict: /screen/:id,
 * routeWithStars: /screen/*
 */
const initRoutes = () => {
  const routeWithStars = store.filter(({ url }) => url.includes('*'));
  let routeWithParams = store.filter(({ url }) => url.includes(':'));

  const routeWithParamsWithConflict = [];
  const routeWithParamsWithoutConflit = [];

  routeWithParams.forEach(route => {
    let isConflict = !!routeWithParams.find(({ url: innerUrl }) =>
      innerUrl.includes(route.url + '/')
    );
    if (isConflict) {
      routeWithParamsWithConflict.push(route);
    } else {
      routeWithParamsWithoutConflit.push(route);
    }
  });

  const routeWithoutParams = store.filter(
    ({ url }) => !url.includes(':') && !url.includes('*')
  );

  routeWithoutParams.forEach(({ method, url, route }) => {
    koaRouter[method](url, route);
  });
  routeWithParamsWithoutConflit.forEach(({ method, url, route }) => {
    koaRouter[method](url, route);
  });
  routeWithParamsWithConflict.forEach(({ method, url, route }) => {
    koaRouter[method](url, route);
  });
  routeWithStars.forEach(({ method, url, route }) => {
    koaRouter[method](url, route);
  });

  store.length = 0;

  return koaRouter;
};

module.exports.initRoutes = initRoutes;
module.exports.koaRouter = koaRouter;
module.exports.registerRoute = registerRoute;

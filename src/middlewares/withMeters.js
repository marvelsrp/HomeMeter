const Meter = require('../abstract/meter');
const gpio    = require('rpi-gpio');
const withMeters = (app) => {
  app.meters = [];
  const configArray = JSON.parse(process.env.METERS);

  for(let config of configArray) {
    const meter = new Meter(config);
    app.meters.push( meter);

  }

  //load from storage

  return async (ctx, next) => {

    await next();
  };
};

module.exports = withMeters;

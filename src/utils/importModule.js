const path = require('path');
const glob = require('glob');

const importRouter = module => {
  console.log('importRouter', module)
  const routeFiles = glob.sync(`src/routes/${module}/**/*.js`);
  routeFiles.forEach(file => {
    require(path.resolve(file));
  });
};

module.exports = importRouter;

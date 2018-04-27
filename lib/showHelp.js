exports.help = function(validParams) {
  console.log("\nHomeMeter is a Node.js application for Raspberry PI that collect home meters values");
  console.log("\nAvailable parameters:\n");
  for (var name in global.validParams) {
    var left = '--' + name;
    if (global.validParams[name]['sample']) left += '=' + global.validParams[name]['sample'];
    left += ':';
    var ln = 75 - left.length;
    if (ln < 1) ln = 1;
    console.log(left + ' '.repeat(ln) + global.validParams[name]['title']);
  }
}
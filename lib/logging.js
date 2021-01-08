const debug = require('debug');
const pkg = require('../package');

module.exports = debug(pkg.name);

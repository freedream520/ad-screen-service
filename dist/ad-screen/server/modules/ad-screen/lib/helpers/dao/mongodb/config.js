var path = require('path');
var createConfig = require('../../config.js').createConfig;
module.exports = createConfig(path.join('dao', 'mongodb.json'));
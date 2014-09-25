var redis = require('../lib/helpers/dao/redis/config.js');
var mongodb = require('../lib/helpers/dao/mongodb/config.js');

module.exports = function (app) {
    var dir = app.get('configDir');
    redis.setConfigDir(dir);
    mongodb.setConfigDir(dir);
};


var config = require('../lib').config;

module.exports = function (app) {
    var dir = app.get('configDir');
    config.createConfigHandler(dir);
};


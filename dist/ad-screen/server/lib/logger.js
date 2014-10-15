/**
* 参考：http://blog.fens.me/nodejs-log4js/
*/
var path  = require('path');
var express    = require('express');
var log4js     = require('log4js');
var ServerMode = require('./mode.js');

/**
* 初始化Logger配置。
* @param {Express} app WEB应用对象实例。
*/
function init(app){
  var configDir = app.get('configDir');
  /*log4js配置目录*/
  var log4js_config = path.resolve(configDir, 'log4js.json');
  /*WEB应用根目录*/
  var cwd = path.normalize(path.resolve(__dirname, '..'));
  log4js.configure(log4js_config, { 'cwd': cwd});

}

/**
* 设置WEB应用全局的访问日志和错误日志。
* @param {Express} app WEB应用对象实例。
*/
function setAppLogger(app){
  var mode = app.get('mode');
  var level = 'INFO';
  switch(mode){
    case ServerMode.STUB:
    case ServerMode.DEV:
      level = 'TRACE';
      break;
  }
  var access_logger = log4js.getLogger('access');
  var error_logger = log4js.getLogger('error');
  access_logger.setLevel(level);
  app.use(log4js.connectLogger(access_logger, { 'level': level }));
  app.use(function (err, req, res, next) {
    if (err) {
      var meta = '[' + new Date() + '] ' + req.url + '\n';
      error_logger.fatal(meta + err.stack + '\n');      
    };
    next();
  });
  app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
  }));
}

module.exports = {
  init: init,
  setAppLogger: setAppLogger
};
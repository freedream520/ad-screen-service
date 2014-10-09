/**
* 负责在命令行下启动服务。
*/
var nopt = require("nopt"),
    path = require('path');

var Package = require('../lib/package.js'),
    Server = require('../lib/server.js'),
    ServerMode = require('../lib/mode.js'),
    Cluster = require('../lib/cluster.js'),
    hook = require('../lib/hook.js');

var knownOpts = { "mode" : [String, null], "configDir" : [String, null] }
  , shortHands = { "m" : ["--mode"], "c" : ["--configDir"] }
  , parsed = nopt(knownOpts, shortHands, process.argv, 2)

/**
* 从key-value字典中检索。
* @param {Array} dict 查找的字典。
* @param {String} key 用于查找的键。
* @param {String} def 检索不到值时，提供的默认值。
*/
function getValue(dict, key, def){
    var result;
    if (dict.hasOwnProperty(key)) {
        result = dict[key];
    }
    if(!result){
        result = def;
    }
    return result;
}

// 支持桩（stub）、开发（dev）和产品（pro）三种启动模式。
var mode = getValue(parsed, 'mode', ''),
    configDir = getValue(parsed, 'configDir', '../config');
if (ServerMode.check(mode)) {
    var root = path.normalize(path.resolve(__dirname, '..'));
    var options = { 'mode': mode, 'configDir': path.normalize(path.resolve(root, configDir)) };
    var server = new Server(options);
    new Cluster(server);
    // 触发服务器启动的钩子
    hook.execHook(hook.Hook.START, options);
}else{
    console.log('stop!');
}


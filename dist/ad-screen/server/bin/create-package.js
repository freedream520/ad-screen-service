/**
* 合并Node-Server框架及当前所有模块的npm依赖。
*/
var path    = require('path');
var Package = require('../lib/package.js');

var root = path.normalize(path.join(__dirname, '..'));
var pkg = new Package(root);
pkg.create();

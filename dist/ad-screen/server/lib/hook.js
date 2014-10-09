var fs  = require('fs');
var path  = require('path');

/**
* Node-Server框架支持的钩子。
*/
var Hook = {
    /**
    * 服务器启动时触发的钩子。
    */
    'START': 'start'
};

/**
* Node-Server框架下的钩子管理器。
* @param {String} hooks 服务器钩子所在的路径。
*/
function HookManager(hooks) {
    this.hooks = hooks || 'hooks';
}
HookManager.prototype = {
    /**
    * 执行特定的钩子。
    * @param {String} hook 特定的钩子。
    * @param {Object} data 传递给钩子的数据。
    */
    exec: function(hook, data){
        data = data || {};
        hook = path.normalize(path.join(__dirname, '..', this.hooks, hook));
        if (fs.existsSync(hook) && fs.statSync(hook).isDirectory()) {
            var list = fs.readdirSync(hook);
            for (var i = 0; i < list.length; i++) {
                var file_path = path.join(hook, list[i]);
                if (fs.statSync(file_path).isFile()) {
                    require(file_path)(data);
                }
            };
        };
    }
};

var manager = new HookManager();

/**
* 执行特定的钩子。
* @param {String} hook 特定的钩子。
* @param {Object} data 传递给钩子的数据。
*/
function execHook(hook, data){
    manager.exec(hook, data);
}
module.exports = {
    Hook: Hook,
    execHook: execHook
};
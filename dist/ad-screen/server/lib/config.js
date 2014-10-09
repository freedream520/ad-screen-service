var fs  = require('fs');
var _   = require('lodash');
var path  = require('path');

/**
* 系统配置管理器。
* @param {ServerMode} mode 服务器运行模式。
* @param {String} cfg 指定使用的配置文件地址。
*/
function ConfigManager(mode, cfg){
    this.mode = mode;
    this.config = {};
    this.merge(this.getDefaultConfig());
    this.initialise(mode, cfg);
}
ConfigManager.prototype = {
    /**
    * 初始化。
    * @param {ServerMode} mode 服务器运行模式。
    * @param {String} cfg 指定使用的配置文件地址。
    */
    initialise: function(mode, cfg){
        cfg = path.join(cfg, [mode, '.json'].join(''));
        path.normalize(cfg);
        if (fs.statSync(cfg).isFile()) {
            var config = require(cfg);
            this.merge(config);
        }
    },

    /**
    * 合并配置数据。
    * @param {JSON} config 需要合并的配置。
    */
    merge: function(config){
        return _.merge(this.config, config);
    },

    /**
    * 获取默认配置。
    */
    getDefaultConfig: function(){
        return {
            'app': {
                'http_port': '1314',
                'https_port': '',
                'vhosts': [],
                'static_routes': [],
                'allowJSON': true,
                'allowCookieParser': true,
                'allowMultipart': true
            }
        };
    },

    /**
    * 获取当前配置。
    */
    getConfig: function(){
        return this.config;
    }
};

module.exports = ConfigManager;

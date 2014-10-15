var _         = require('lodash');
var fs        = require('fs');
var path      = require('path');
var http      = require('http');
var express   = require('express');
var multipart = require('connect-multiparty');
var ServerMode      = require('./mode.js');
var ConfigManager   = require('./config.js');
var ModuleManager   = require('./module.js');
var logger   = require('./logger.js');

/**
* Node-Server框架。
* @param {Array} options 初始化服务的选项，格式如：{mode: '', configDir: ''}。
*/
function Server(options) {
    var app = express();

    this.mode = options['mode'];
    this.configDir = options['configDir'];
    app.set('mode', this.mode);
    app.set('configDir', this.configDir);

    /*初始化Logger配置*/
    logger.init(app);
    this.config = new ConfigManager(this.mode, this.configDir);

    /**
    * 启动WEB服务。
    * @param {Array} cfg 启动WEB服务的配置信息，将覆盖配置文件的配置。
    */
    this.start = function (cfg) {
        app.use(express.favicon());
        app.use(express.compress());

        cfg = cfg || {};
        var settings = this.config.merge(cfg);

        //扫瞄模块信息
        var manager = new ModuleManager();
        //加载模块中间件
        manager.applyMiddleware(app);

        app.use(express.errorHandler());
        app.use(express.urlencoded());
        if(settings.app.allowCookieParser){
            app.use(express.cookieParser());
        }
        if(settings.app.allowJSON){
            app.use(express.json());
        }
        if(settings.app.allowMultipart){
            app.use(multipart());
        }
        app.use(express.methodOverride());
        app.use(app.router);

        //配置WEB服务接受的虚拟主机域名
        var vhosts = settings.app.vhosts;
        if (vhosts) {
            if (_.isString(vhosts)) {
                app.use(express.vhost(vhosts, app));
            };
            if (_.isArray(vhosts)) {
                for (var i = 0; i < vhosts.length; i++) {
                    app.use(express.vhost(vhosts[i], app));
                };
            };
        };

        //加载模块路由
        manager.applyRoutes(app);

        //静态文件路由的映射
        var routes = settings.app.static_routes;
        if (routes) {
            for (var i = 0; i < routes.length; i++) {
                var route = routes[i];
                var absolute = path.normalize(path.resolve(__dirname, '..', route.dir));
                console.log(absolute);
                app.use(route.path, express.static(absolute));
            };
        }

        //设置WEB应用全局的访问日志和错误日志
        logger.setAppLogger(app);

        var node = http.createServer(app);
        // 加载模块附件
        manager.applyAttachments(node);
        node.listen(settings.app.http_port || null);

        console.log('Serving at port:' + (settings.app.http_port || ''));
    };

    return this;
};

module.exports = Server;
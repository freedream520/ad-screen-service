var fs  = require('fs');
var _   = require('lodash');
var path    = require('path');
var semver  = require('semver');

/**
* 合并Node-Server框架及当前所有模块的npm依赖。
* @param {String} root Node-Server框架的根目录。
*/
function PackageManager(root){
    this.root = root;
    this.pkg = {};
    this.initialise();
}
PackageManager.prototype = {
    /**
    * 初始化。
    */
    initialise: function(){
        var base_file = this.check(path.join(this.root, 'config'));
        if (base_file) {
            var base_package = require(base_file);
            var server_file = this.check(this.root);
            if (server_file) {
                this.pkg = require(server_file);
                this.merge(base_package);
            }else{
                this.pkg = base_package;
            }    
            var modules_path = path.join(this.root, 'modules')
            modules = fs.readdirSync(modules_path);
            for (var i = 0; i < modules.length; i++) {
                var module_path = path.join(modules_path, modules[i]);
                var module_file = this.check(module_path);
                if (module_file) {
                    var pkg = require(module_file);
                    this.merge(pkg);
                }
            };
        }else{
            console.log('node-server package.json missed.')
        }
    },

    /**
    * 生成package.json。
    */
    create: function(){
        var filename = path.join(this.root, 'package.json');
        var data = JSON.stringify(this.pkg, null, 2);
        fs.writeFileSync(filename, data);
        console.log(this.pkg);
        return this.pkg;
    },

    /**
    * 检查指定目录下是否存在package.json文件。
    * @param {String} dir 指定的目录。
    * @return {String|Boolean} 如果不存在，返回false。如果存在，返回package.json的绝对路径。
    */
    check: function(dir){
        var file_path = path.join(dir, 'package.json');
        if (fs.existsSync(file_path)) {
            return file_path;
        }else{
            return false;
        }
    },

    clean: function(version){
        if ('~' === version[0]) {
            return version.substring(1);
        }
        return version;
    },

    /**
    * 从package.json中提取合并依赖。
    * @param {JSON} pkg package.json
    */
    merge: function(pkg){
        if (!this.pkg.hasOwnProperty('dependencies')) {
            this.pkg['dependencies'] = {};
        }
        if (pkg.hasOwnProperty('dependencies')) {
            var o = pkg['dependencies'];
            for(var key in o){
                var version = o[key];
                if (this.pkg['dependencies'].hasOwnProperty(key)) { 
                    var v1 = this.clean(version);
                    var v2 = this.clean(this.pkg['dependencies'][key]);
                    if(semver.gt(v1, v2)) {
                        this.pkg['dependencies'][key] = version;
                    }
                }else{
                    this.pkg['dependencies'][key] = version;
                }
            }
        };
    }
}

module.exports = PackageManager;

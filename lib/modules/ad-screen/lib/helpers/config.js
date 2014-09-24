var path = require('path');

function Config(path){
    this.path = path;
    this.configDir = '';
    this.config = null;
}
Config.prototype.setConfigDir = function(dir) {
    this.configDir = dir;
};
Config.prototype.getConfig = function() {
    if(!this.config){
        this.config = require(path.join(this.configDir, this.path));
    }
    return this.config;
};

module.exports = {
    createConfig: function(path){
        return new Config(path);
    }
};
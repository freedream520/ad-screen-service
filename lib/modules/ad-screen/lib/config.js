var config, 
    createConfigHandler = require('server-helpers').createConfigHandler;

module.exports = {
    createConfigHandler: function(dir){
       config = createConfigHandler(dir);
    },
    getSettings: function(key){
        var setting = {};
        if(config){
            setting = config.getSettings(key);
        }
        return setting;
    }
};
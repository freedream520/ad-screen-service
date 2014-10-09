/**
* 服务器运行模式。
*/
var ServerMode = {
    /**
    * 测试桩模式。
    */
    'STUB': 'stub',

    /**
    * 开发模式。
    */
    'DEV': 'dev',

    /**
    * 开发模式。
    */
    'PRO': 'pro',

    /**
    * 检查是否是合法的服务器运行模式。
    */
    'check': function(mode){
        for(key in this){
            if (('string' === typeof(this[key])) && (mode === this[key])) { return true; };
        }
        return false;
    }
};

module.exports = ServerMode;

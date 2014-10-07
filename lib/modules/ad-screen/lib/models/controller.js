var Q = require('q'),
    _ = require('lodash');

var //Observer = require('./observer.js'),
    dao = require('../dao/ad.js');

function execute(type, id){
    var deferred = Q.defer();
    var actions = ['pause', 'start'];
    id = id.trim();
    type = type.trim();
    if(!id){
        deferred.reject(new Error('id is empty'));
    }
    if(type && (_.indexOf(actions, type) > -1)){
        var active = 1;
        if('pause' == type){
            active = 0;
        }
        dao.save({
            id: id,
            active: active,
            modified: (new Date()).getTime()
        })
        .then(function(data){
            // 广告数据发生变化时，更新与此广告有关的所有缓存
            //Observer.emitAdSave(id);
            deferred.resolve({ type: type, id: id });
        })
        .catch(function(err){
            deferred.reject(err);
        });
    }else{
        deferred.reject(new Error('action type'));
    }
    return deferred.promise;
}

module.exports = {
    execute: execute
};
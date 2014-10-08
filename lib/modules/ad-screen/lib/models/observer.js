/**
* 广告数据缓存的观察者对象。
*/
var EventEmitter = require('events').EventEmitter;

var dao = require('../dao/ad.js'),
    AdCollection = require('../collections/ad.js');

var org = 'stbm',
    observer = new EventEmitter();

function getPushEvent(sn){
    return ['push', sn].join(':');
}

function createTask(sn){
    return function(){
        var evt = getPushEvent(sn);
        AdCollection.getActiveList(sn)
        .then(function (items) {
            observer.emit(evt, items);
        });
    };
}

function emitSave(id){
    observer.emit('save', id);
}

function emitPush(sn){
    createTask(sn)();
}

observer.on('save', function(id){
    dao.load(id, {})
    .then(function(data){
        var screens = [];
        if(data.screens){
            screens = data.screens;
        }
        var i, task;
        for(i = 0; i < screens.length; i++){
            task = createTask(screens[i]);
            task();
        }
    });
});

module.exports = {
    listen: function(sn, listener){
        var evt = getPushEvent(sn);
        observer.on(evt, listener);
    },
    emitPush: emitPush,
    emitSave: emitSave
};
/**
* 广告数据缓存的观察者对象。
*/
var EventEmitter = require('events').EventEmitter;

var Ad = require('./ad.js'),
    AdCollection = require('../collections/ad.js'),

var org = 'stbm',
    observer = new EventEmitter();

function getPushEvent(sn){
    return ['push', sn].join(':');
}

function emitSave(id){
    observer.emit('save', id);
}

function emitPush(sn){
    createTask(sn)();
}

observer.on('save', function(id){
    function createTask(sn){
        var evt = getPushEvent(sn);
        AdCollection.getActiveList(sn)
        .then(function (items) {
            observer.emit(evt, items);
        })
    }
    var ad = new Ad(org, id);
    ad.getDetailedInfo()
    .then(function (data) {
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
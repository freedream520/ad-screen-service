var Q = require('q'),
    _   = require('lodash'),
    moment = require('moment');

var dao = require('../dao/ad.js');

function getList(options){
    var defaultOptions = { page: 1, rows: 20 },
        defaultFields = {
            id: 1,
            title: 1,
            path: 1,
            start: 1,
            end: 1,
            slotType: 1,
            materielType: 1,
            active: 1
        };

    options = _.merge(defaultOptions, options);
    options.fields = options.fields || defaultFields;

    var deferred = Q.defer();
    dao.getList(options)
    .then(function(list){
        deferred.resolve(list);
    })
    .catch(function(err){
        deferred.reject(err);
    });
    return deferred.promise;
}

function getActiveList(sn){
    var deferred = Q.defer();
    if('a0b1c2d3e4f5g6h7i8j9' === sn){
        sn = '';
    }
    var options = { page: 1, rows: 1e4, active: '1', screen: sn };
    getList(options)
    .then(function (items) {
        var results = [];
        items.map(function(item){
            if(item.start && item.end){
                var now = moment();
                if(now.isAfter(moment(item.start)) && now.isBefore(moment(item.end))){
                    results.push(item);
                }
            }
        });
        deferred.resolve(results);
    })
    .catch(function(err){
        deferred.reject(err);
    });
    return deferred.promise;
}

module.exports = {
    getList: getList,
    getActiveList: getActiveList
};
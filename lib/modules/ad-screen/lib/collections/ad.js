var Q = require('q'),
    _   = require('lodash');

var dao = require('../dao/ad.js');

function getList(options){
    var defaultOptions = { page: 1, rows: 20 },
        defaultFields = {
            id: 1,
            title: 1,
            start: 1,
            end: 1,
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

module.exports = {
    getList: getList
};
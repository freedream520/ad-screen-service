var Q = require('q');
var dao = require('../dao/screen.js');

function getList(){
    var deferred = Q.defer();
    dao.getList()
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